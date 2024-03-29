<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeStoreManyRequest;
use App\Http\Requests\EmployeeStoreRequest;
use App\Http\Requests\EmployeeUpdateRequest;
use App\Models\Employee;
use App\Models\School;
use App\Models\User;
use App\Queries\EmployeeQuery;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Employee::class);

        $employees = Employee::with('user')->latest();

        // check if a search term was entered
        if ($request->has('search')) {
            $search = $request->input('search');
            $employees->where(function ($query) use ($search) {
                $query->where('NIP', 'like', '%' . $search . '%')
                    ->orWhereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%')
                            ->orWhere('email', 'like', '%' . $search . '%');
                    });
            });
        }



        $employees = $employees->paginate();

        return Inertia::render('Employee/Index', [
            'session' => session()->all(),
            'employees' => $employees,
        ]);
    }

    public function create()
    {
        return Inertia::render('Employee/Create', [
            'session' => session()->all(),
            'schools' => School::orderBy('name')->get(),
        ]);
    }

    public function store(EmployeeStoreRequest $request)
    {
        $user = User::create($request->only('email', 'name') + ['password' => $request->nip]);
        $user->employee()->create($request->validated());
        $user->employee->schools()->attach(School::whereIn('id', $request->school_ids)->get());
        return back();
    }

    public function storeMany(EmployeeStoreManyRequest $request)
    {
        $users = $request->only('name', 'email', 'nip');
        $users = collect($users)->map(fn ($u) => collect($u)->put('password', $u['nip'])->toArray());
        $employee = $request->only('nip', 'classroom_id');

        DB::beginTransaction();
        User::insert($users);

        $users = User::whereIn('email', $request->email)
            ->orderByRaw('FIELD(email,' . collect($request->email)->implode(fn ($e) => "'$e'", ',') . ')')
            ->get();
        for ($i = 0; $i < sizeof($users); $i++) {
            $users[$i]->student = $employee[$i] + ['user_id' => $users[$i]['id'], 'created_at' => now(), 'updated_at' => now()];
        }
        Employee::insert($users->pluck('employee')->toArray());
        DB::commit();
        return response(['message' => 'ok']);
    }


    public function edit(Employee $employee)
    {
        $this->authorize('view', $employee);
        return Inertia::render('Employee/Edit', [
            'session' => session()->all(),
            'employee' => Employee::with('user')->with('schools')->find($employee->id),
            'schools' => School::orderBy('name')->get()
        ]);
    }

    public function showByNip($nip)
    {
        $employee = Employee::with('user')->with('schools')->where('nip', $nip)->firstOrFail();
        return response((new EmployeeQuery)->where('nip', $nip)->includes()->firstOrFail());
    }

    public function show(Employee $employee)
    {
        $user = User::find($employee->user_id);
        return Inertia::render('Employee/Show', [
            'session' => session()->all(),
            'employee' => Employee::with('user', 'schools')->findOrFail($employee->id),
            'transactions' => $user->transactions()->latest()->paginate(),
            'balance' => number_format($user->balance),
        ]);
    }


    public function update(EmployeeUpdateRequest $request, Employee $employee)
    {
        DB::beginTransaction();
        if ($request->name) $employee->user()->update($request->only('name', 'email'));
        if ($request->school_ids) {
            $employee->schools()->detach();
            $employee->schools()->attach($request->school_ids);
        }
        $employee->update($request->validated());
        DB::commit();
        return back();
    }

    public function destroy(Employee $employee)
    {
        $this->authorize('delete', $employee);
        $employee->delete();
        return back();
    }
}
