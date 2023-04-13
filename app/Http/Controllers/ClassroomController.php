<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClassroomStoreManyRequest;
use App\Http\Requests\ClassroomStoreRequest;
use App\Http\Requests\ClassroomUpdateRequest;
use App\Models\Classroom;
use App\Models\School;
use App\Queries\ClassroomQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Classroom::class);

        $classrooms = Classroom::with('school')->latest();

        // check if a search term was entered
        if ($request->has('search')) {
            $search = $request->input('search');
            $classrooms->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('class', 'like', $search);
            });
        }

        $classrooms = $classrooms->paginate();

        return Inertia::render('Classroom/Index', [
            'session' => session()->all(),
            'classrooms' => $classrooms,
        ]);
    }

    public function create()
    {
        return Inertia::render('Classroom/CreateOrUpdate', [
            'session' => session()->all(),
            'schools' => School::orderBy('name')->get(),
        ]);
    }

    public function store(ClassroomStoreRequest $request)
    {
        $classroom = Classroom::create($request->validated());
        return back();
    }

    public function storeMany(ClassroomStoreManyRequest $request)
    {
        Classroom::insert($request->validated());
        return response(['message' => 'ok']);
    }


    public function edit(Classroom $classroom)
    {
        return Inertia::render('Classroom/CreateOrUpdate', [
            'session' => session()->all(),
            'schools' => School::orderBy('name')->get(),
            'classroom' => $classroom->load('school'),
        ]);
    }


    public function update(ClassroomUpdateRequest $request, Classroom $classroom)
    {
        $classroom->update($request->validated());
        return response($classroom);
    }

    public function destroy(Classroom $classroom)
    {
        $this->authorize('delete', $classroom);
        if ($classroom->students->count() > 0)
            return back()->withErrors(['message' => 'Cannot delete classroom with students.']);
        $classroom->delete();
        return back();
    }
}
