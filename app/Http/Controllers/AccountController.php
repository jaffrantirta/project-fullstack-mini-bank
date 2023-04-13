<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountStoreRequest;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        $accounts = Account::latest();

        // check if a search term was entered
        if ($request->has('search')) {
            $search = $request->input('search');
            $accounts->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('code', 'like', '%' . $search . '%');
            });
        }

        $accounts = $accounts->paginate();

        return Inertia::render('Account/Index', [
            'session' => session()->all(),
            'accounts' => $accounts,
        ]);
    }
    public function create()
    {
        return Inertia::render('Account/CreateOrUpdate', [
            'session' => session()->all()
        ]);
    }
    public function store(AccountStoreRequest $request)
    {
        Account::create($request->validated());
        return back();
    }
    public function edit(Account $account)
    {
        return Inertia::render('Account/CreateOrUpdate', [
            'session' => session()->all(),
            'account' => $account,
            'isUpdate' => true
        ]);
    }
    public function update(AccountStoreRequest $request, Account $account)
    {
        $account->update($request->validated());
        return back();
    }
    public function destroy(Account $account)
    {
        $transaction = Transaction::whereRaw("JSON_CONTAINS(meta, '\"$account->id\"', '$.account_id')")->count();
        if ($transaction > 0) return back()->withErrors(['message' => 'Akun Transaksi digunakan.']);
        $account->delete();
        return back();
    }
}
