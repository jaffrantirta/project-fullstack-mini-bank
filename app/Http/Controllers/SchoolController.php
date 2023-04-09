<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolStoreRequest;
use App\Http\Requests\SchoolUpdateRequest;
use App\Models\School;
use App\Queries\SchoolQuery;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index()
    {
        return Inertia::render('School/Index', [
            'session' => session()->all(),
            'schools' => School::latest()->paginate(),
        ]);
    }


    public function store(SchoolStoreRequest $request)
    {
        $school = School::create($request->validated());
        return response($school);
    }


    public function show(School $school)
    {
        return response($school);
    }


    public function update(SchoolUpdateRequest $request, School $school)
    {
        $school->update($request->validated());
        return response($school);
    }

    public function destroy(School $school)
    {
        $this->authorize('delete', $school);
        $school->delete();
        return response(['message' => 'deleted']);
    }
}
