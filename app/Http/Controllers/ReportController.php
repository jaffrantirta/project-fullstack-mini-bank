<?php

namespace App\Http\Controllers;

use App\Enums\TransactionTypes;
use App\Exports\TotalReport;
use App\Http\Requests\HighestReportRequest;
use App\Http\Requests\TotalReportRequest;
use App\Models\Transaction;
use Bavix\Wallet\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function index()
    {
        return Inertia::render('Report/Index', [
            'session' => session()->all(),
        ]);
    }
    public function totalReport()
    {
        $start_date = request()->start_date;
        $end_date = request()->end_date;
        $type = request()->type;

        return Excel::download(new TotalReport($start_date, $end_date, $type), 'report-' . $start_date . '-' . $end_date . '-' . $type . '.xlsx');
    }

    public function weeklyReport()
    {
        $transactions = Transaction::whereBetween('created_at', [
            now()->startOfWeek(),
            now()->endOfWeek()
        ])->get();
        $transactions = Transaction::all();
        $transactions = $transactions->groupBy(function ($transaction) {
            return $transaction->created_at->format('l');
        });


        $counts = $transactions->map(function ($group) {
            return [
                'day' => $group->first()->created_at->format('l'),
                'withdraw' => $group->where('type', TransactionTypes::WITHDRAW->value)->count(),
                'deposit' => $group->where('type', TransactionTypes::DEPOSIT->value)->count(),
            ];
        });

        $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        $zeroCounts = collect(array_flip($days))->map(function ($day) use ($days) {
            return [
                'day' => $days[$day],
                'withdraw' => 0,
                'deposit' => 0,
            ];
        });

        $counts = $zeroCounts->merge($counts)->sortBy(function ($count) use ($days) {
            return array_search($count['day'], $days);
        });
        return $counts;
    }

    public function activeWalletReport()
    {
        $wallets = Wallet::with('holder.student.classroom.school')->whereHas('holder.student')->get();
        $summedBalances = $wallets->groupBy(function ($wallet) {
            return optional($wallet?->holder?->student?->classroom?->school)->name;
        });
        $result = [];
        foreach ($summedBalances as $sum) {
            $result[] = [
                'school' => $sum->first()->holder?->student?->classroom?->school->name,
                'balance' => $sum->sum('balance')
            ];
        }
        return response($result);
    }

    public function highestReport(HighestReportRequest $request)
    {
        return response(
            Wallet::orderBy('balance', 'desc')
                ->with('holder.student.classroom.school')
                ->when($request->school_id, fn ($q) => $q->whereRelation('holder.student.classroom', 'school_id', $request->school_id))
                ->when($request->classroom_id, fn ($q) => $q->whereRelation('holder.student', 'classroom_id', $request->classroom_id))
                ->limit($request->limit ?? 5)->get()
        );
    }
}
