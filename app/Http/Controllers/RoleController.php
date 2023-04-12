<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignRoleRequest;
use App\Http\Requests\RevokeRoleRequest;
use App\Models\Employee;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('Role/Index', [
            'school_admins' => User::role('school-admin')->with('student.classroom.school', 'employee.schools')->paginate(),
            'student_admins' => User::role('student-admin')->with('student.classroom.school', 'employee.schools')->paginate(),
            'session' => session()->all()
        ]);
    }

    public function create()
    {
        return Inertia::render('Role/Create', [
            'session' => session()->all()
        ]);
    }

    public function store(AssignRoleRequest $request)
    {
        $user = Employee::where('NIP', $request->number_id)->first();
        if (!$user) $user = Student::where('NIS', $request->number_id)->first();
        if (!$user) return back()->withErrors(['number_id' => 'Nomor identitas tidak valid']);

        $user = User::find($user->user_id);

        $user->assignRole($request->role_name);

        return back();
    }

    public function destroy(RevokeRoleRequest $request)
    {
        $user = User::find($request->user_id);
        $user->removeRole($request->role_name);
        return back();
    }
}
