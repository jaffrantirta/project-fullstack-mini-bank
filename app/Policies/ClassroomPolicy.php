<?php

namespace App\Policies;

use App\Models\Classroom;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClassroomPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return true;
    }

    public function create(User $user, $school_id)
    {
        return $user->can('create-classroom');
    }

    public function createMany(User $user, $school_id)
    {
        return $user->can('create-many-classroom');
    }

    public function edit(User $user, Classroom $classroom)
    {
        return $user->can('edit-classroom');
    }

    public function delete(User $user, Classroom $classroom)
    {
        return $user->can('delete-classroom');
    }
}
