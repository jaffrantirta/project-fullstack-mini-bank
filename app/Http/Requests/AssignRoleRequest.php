<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class AssignRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()?->can('assign-role', Role::findOrFail($this->role_id));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'role_name' => ['exists:roles,name', 'required'],
            'number_id' => [
                function ($attribute, $value, $fail) {
                    $employee = DB::table('employees')->where('NIP', $value)->first();
                    $student = DB::table('students')->where('NIS', $value)->first();
                    if (!$employee && !$student) {
                        $fail("$attribute is invalid.");
                    }
                },
                'required'
            ],
        ];
    }
}
