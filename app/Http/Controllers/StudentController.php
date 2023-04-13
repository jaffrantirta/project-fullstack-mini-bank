<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentStoreManyRequest;
use App\Http\Requests\StudentStoreRequest;
use App\Http\Requests\StudentUpdateRequest;
use App\Models\Classroom;
use App\Models\School;
use App\Models\Student;
use App\Models\User;
use App\Queries\StudentQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Student::class);

        $students = Student::with('user')->with('classroom')->latest();

        // check if a search term was entered
        if ($request->has('search')) {
            $search = $request->input('search');
            $students->where(function ($query) use ($search) {
                $query->where('NIS', 'like', '%' . $search . '%')
                    ->orWhereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%')
                            ->orWhere('email', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('classroom', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%');
                    });
            });
        }



        $students = $students->paginate();

        return Inertia::render('Student/Index', [
            'session' => session()->all(),
            'students' => $students,
        ]);
        $this->authorize('viewAny', Student::class);
        return response((new StudentQuery)->includes()->filterSortPaginateWithAppend());
    }

    public function create()
    {
        return Inertia::render('Student/CreateOrUpdate', [
            'session' => session()->all(),
            'classrooms' => Classroom::orderBy('name')->with('school')->get(),
        ]);
    }

    public function store(StudentStoreRequest $request)
    {
        DB::beginTransaction();
        $user = User::create($request->only('email', 'name') + ['password' => $request->nis]);
        $user->student()->create($request->only(['nis', 'classroom_id']));
        DB::commit();
        return back();
    }

    public function storeMany(StudentStoreManyRequest $request)
    {
        $users = $request->only('name', 'email', 'nis');
        $users = collect($users)->map(fn ($u) => collect($u)->put('password', $u['nis'])->toArray());
        $students = $request->only('nis', 'classroom_id');

        DB::beginTransaction();
        User::insert($users);

        $users = User::whereIn('email', $request->email)
            ->orderByRaw('FIELD(email,' . collect($request->email)->implode(fn ($e) => "'$e'", ',') . ')')
            ->get();
        for ($i = 0; $i < sizeof($users); $i++) {
            $users[$i]->student = $students[$i] + ['user_id' => $users[$i]['id'], 'created_at' => now(), 'updated_at' => now()];
        }
        Student::insert($users->pluck('student')->toArray());
        DB::commit();
        return response(['message' => 'ok']);
    }


    public function edit(Student $student)
    {
        $this->authorize('create', Student::class);
        return Inertia::render('Student/CreateOrUpdate', [
            'session' => session()->all(),
            'isUpdate' => true,
            'classrooms' => Classroom::orderBy('name')->with('school')->get(),
            'student' => Student::with('user')->with('classroom')->findOrFail($student->id)
        ]);
    }

    public function showByNis($nis)
    {
        return response((new StudentQuery)->where('nis', $nis)->includes()->firstOrFail());
    }

    public function show(Student $student)
    {
        $user = User::find($student->user_id);
        return Inertia::render('Student/Show', [
            'session' => session()->all(),
            'student' => Student::with('user', 'classroom.school')->findOrFail($student->id),
            'transactions' => $user->transactions()->latest()->paginate(),
            'balance' => number_format($user->balance),
        ]);
    }


    public function update(StudentUpdateRequest $request, Student $student)
    {
        $student->user()->update($request->except('nis', 'classroom_id'));
        $student->update($request->validated());
        return back();
    }

    public function destroy(Student $student)
    {
        $this->authorize('delete', $student);
        $student->delete();
        return back();
    }
}
