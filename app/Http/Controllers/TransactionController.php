<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionStoreManyRequest;
use App\Http\Requests\TransactionStoreRequest;
use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use Bavix\Wallet\External\Api\TransactionQuery;
use Bavix\Wallet\External\Api\TransactionQueryHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    protected function getTransactionBaseMeta($request): array
    {
        return [
            'collected_by' => auth()->user()->name,
            'date' => $request->transaction_date ?? now(),
            'code' => $request->transaction_code,
            'account_id' => $request->account_id,
        ];
    }

    public function show(Transaction $transaction)
    {
        $this->authorize('viewAny', $transaction);
        return Inertia::render('Transaction/Show', [
            'session' => session()->all(),
            'transaction' => $transaction,
        ]);
    }

    public function index(Request $request)
    {
        $this->authorize('viewAny', Transaction::class);
        $transactions = Transaction::latest();

        if ($request->has('search')) {
            $search = $request->input('search');
            $transactions->where(function ($query) use ($search) {
                $query->whereRaw("JSON_CONTAINS(meta, '\"$search\"', '$.code')");
            });
        }




        $transactions = $transactions->paginate();

        return Inertia::render('Transaction/Index', [
            'session' => session()->all(),
            'transactions' => $transactions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Transaction/Create', [
            'session' => session()->all(),
            'accounts' => Account::orderBy('code')->get(),
            'transaction_code' => auth()->user()->id . '-' . now()->timestamp,
        ]);
    }

    public function store(TransactionStoreRequest $request)
    {
        $user = User::find($request->user_id);

        DB::beginTransaction();
        if ($request->transaction_type === 'deposit')
            $user->deposit($request->amount, $this->getTransactionBaseMeta($request));
        else if ($request->transaction_type === 'withdraw' && ($user->balance - $request->amount) >= 10000)
            $user->withdraw(abs($request->amount), $this->getTransactionBaseMeta($request));
        else return back()->withErrors(['final_balance' => 'The final balance must be at least 10,000']);

        $latest_id = $user->transactions()->latest()->first()->id;

        //logs activity
        $transaction = $user->transactions()->latest()->first();
        activity()
            ->performedOn($user->transactions()->latest()->first())
            ->causedBy(auth()->user())
            ->withProperties($transaction->toArray())
            ->event('transaction.' . $request->transaction_type)
            ->log('created');
        DB::commit();

        return Inertia::render('Transaction/Create', [
            'session' => session()->all(),
            'transaction_id' => $latest_id,
            'accounts' => Account::orderBy('code')->get(),
            'transaction_code' => auth()->user()->id . '-' . now()->timestamp,
        ]);
    }

    public function storeMany(TransactionStoreManyRequest $request)
    {
        $user_ids = array_column($request->transactions, 'user_id');
        $amounts = array_column($request->transactions, 'amount');

        $wallets = User::whereIn('id', $user_ids)
            ->orderByRaw("FIELD(id," . implode($user_ids) . ")")
            ->with('wallet')
            ->get()->pluck('wallet');

        $transactions = [];
        for ($i = 0; $i < count($wallets); $i++) {
            $transactions[] = [
                'wallet' => $wallets[$i],
                'amount' => $amounts[$i],
            ];
        }
        app(TransactionQueryHandler::class)->apply(
            array_map(
                static fn ($transaction) => TransactionQuery::createDeposit($transaction['wallet'], $transaction['amount'], $this->getTransactionBaseMeta($request)),
                $transactions
            )
        );
    }
}
