<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ReinsertRolePermission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permission:reinsert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'deleting all role and permission and then reinserting them';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->truncate();
        $this->createRolesAndPermissions();
        $this->assignPermissionToRoles();
        $this->createSuperAdminUser();
        return Command::SUCCESS;
    }

    protected function truncate()
    {
        DB::table('role_has_permissions')->truncate();
        DB::table('model_has_roles')->truncate();
        Permission::query()->delete();
        Role::query()->delete();
    }

    protected function createRolesAndPermissions()
    {
        Role::insert($this->getRoles());
        Permission::insert($this->getPermissions());
    }

    protected function createSuperAdminUser()
    {
        DB::table('users')->insert([
            'id' => 1,
            'name' => 'Super Admin',
            'email' => 'super@admin',
            'password' => Hash::make('superadmin'),
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        User::find(1)->assignRole('super-admin');
    }

    protected function assignPermissionToRoles()
    {
        // give super-admin all permission
        Role::findByName('super-admin', 'web')->givePermissionTo(
            Permission::get('name')->pluck('name')->toArray()
        );

        // school-employee & school admin
        Role::findByName('school-employee', 'web')->givePermissionTo(
            // classroom
            'create-classroom',
            'create-many-classroom',
            'edit-classroom',
            'delete-classroom',
            // student
            'create-student',
            'create-many-student',
            'edit-student',
            'delete-student',
            // student
            'create-transaction',
            'create-many-transaction',
            'view-any-transaction',
            'view-own-transaction',
        );

        Role::findByName('school-admin', 'web')->givePermissionTo(
            // roles
            'assign-school-employee-role',
            'revoke-school-employee-role',
            // school
            'edit-school',
            // classroom
            'create-classroom',
            'create-many-classroom',
            'edit-classroom',
            'delete-classroom',
            // student
            'create-student',
            'create-many-student',
            'edit-student',
            'delete-student',
            // student
            'create-transaction',
            'create-many-transaction',
            'view-any-transaction',
            'view-own-transaction',
        );

        Role::findByName('student-admin', 'web')->givePermissionTo(
            // student
            'create-transaction',
            'create-many-transaction',
            'view-any-transaction',
            'view-own-transaction',
        );

        Role::findByName('student', 'web')->givePermissionTo('view-own-transaction');
    }

    protected function getPermissions(): array
    {
        return [
            // roles
            [
                'name' => 'assign-school-admin-role',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'assign-school-employee-role',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'revoke-school-admin-role',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'revoke-school-employee-role',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // school
            [
                'name' => 'create-school',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'edit-school',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-school',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // classroom
            [
                'name' => 'create-classroom',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'create-many-classroom',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'edit-classroom',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-classroom',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // employee
            [
                'name' => 'create-employee',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'create-many-employee',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'edit-employee',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-employee',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // student
            [
                'name' => 'create-student',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'create-many-student',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'edit-student',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-student',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // transaction
            [
                'name' => 'create-transaction',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'create-many-transaction',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-any-transaction',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-own-transaction',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
    }

    protected function getRoles(): array
    {
        return [
            [
                'name' => 'school-employee',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'school-admin',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'student-admin',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'super-admin',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'student',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
    }
}
