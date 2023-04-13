<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Bavix\Wallet\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'session' => session()->all(),
            'deposit' => [
                'total' => number_format($this->getTransactionToday('deposit')->sum('amount')),
                'count' => $this->getTransactionToday('deposit')->count(),
            ],
            'withdraw' => [
                'total' => number_format($this->getTransactionToday('withdraw')->sum('amount')),
                'count' => $this->getTransactionToday('withdraw')->count(),
            ],
            'total' => number_format(Wallet::sum('balance'))

        ]);
    }
    public function getTransactionToday($type)
    {
        return Transaction::where('created_at', '>=', now()->startOfDay())
            ->where('type', $type);
    }
}
