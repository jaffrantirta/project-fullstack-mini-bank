<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrintController extends Controller
{
    public function index(Request $request)
    {
        $transaction = Transaction::find($request->id);
        return Inertia::render('Print/Index', [
            'transaction' => $transaction,
        ]);
    }
}
