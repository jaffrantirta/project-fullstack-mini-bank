<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Employee;
use App\Models\Student;
use Bavix\Wallet\Models\Wallet;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show($account_number)
    {
        $user = Employee::where('nip', $account_number)->with('user')->first();
        if (!$user) {
            $user = Student::where('nis', $account_number)->with('user')->with('classroom')->first();
        }
        return Inertia::render('Transaction/Create', [
            'session' => session()->all(),
            'user' => $user,
            'isEmpty' => $user ? false : true,
            'balance' => $user->user->balance,
            'accounts' => Account::orderBy('code')->get(),
            'transaction_code' => auth()->user()->id . '-' . now()->timestamp,
        ]);
    }
}
