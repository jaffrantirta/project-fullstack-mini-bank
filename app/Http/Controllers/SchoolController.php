<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolStoreRequest;
use App\Http\Requests\SchoolUpdateRequest;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Employee::class);

        $schools = School::latest();

        // check if a search term was entered
        if ($request->has('search')) {
            $search = $request->input('search');
            $schools->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%');
            });
        }

        $schools = $schools->paginate();

        return Inertia::render('School/Index', [
            'session' => session()->all(),
            'schools' => $schools,
        ]);
    }
    // public function index()
    // {
    //     $this->authorize('viewAny', School::class);
    //     return Inertia::render('School/Index', [
    //         'session' => session()->all(),
    //         'schools' => School::latest()->paginate(),
    //     ]);
    // }
    public function create()
    {
        return Inertia::render('School/Create', [
            'session' => session()->all(),
        ]);
    }
    public function store(SchoolStoreRequest $request)
    {
        $school = School::create($request->validated());
        return back();
    }
    public function edit(School $school)
    {
        $this->authorize('view', $school);
        return Inertia::render('School/Edit', [
            'session' => session()->all(),
            'school' => $school,
        ]);
    }
    public function update(SchoolUpdateRequest $request, School $school)
    {
        $school->update($request->validated());
        return back();
    }
    public function destroy(School $school)
    {
        $this->authorize('delete', $school);
        $school->delete();
        return back();
    }
}
