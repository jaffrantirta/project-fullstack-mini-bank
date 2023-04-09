<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolStoreRequest;
use App\Http\Requests\SchoolUpdateRequest;
use App\Models\School;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', School::class);
        return Inertia::render('School/Index', [
            'session' => session()->all(),
            'schools' => School::latest()->paginate(),
        ]);
    }
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
