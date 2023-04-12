<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignRoleRequest;
use App\Http\Requests\RevokeRoleRequest;
use App\Models\User;
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

    public function assign(AssignRoleRequest $request)
    {
        User::find($request->user_id)->assignRole(Role::find($request->role_id));
        return response(['message' => 'ok']);
    }

    public function revoke(RevokeRoleRequest $request)
    {
        User::find($request->user_id)->removeRole(Role::find($request->role_id));
        return response(['message' => 'ok']);
    }
}
