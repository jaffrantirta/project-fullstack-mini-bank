<?php

namespace App\Http\Requests;

use App\Models\Transaction;
use Illuminate\Foundation\Http\FormRequest;

class TransactionStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()?->can('create', Transaction::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'amount' => ['required', 'numeric'],
            'account_id' => ['required', 'exists:accounts,id'],
            'transaction_type' => ['required', 'in:deposit,withdraw'],
            'user_id' => ['required', 'exists:users,id'],
            'transaction_date' => ['date'],
        ];
    }
}
