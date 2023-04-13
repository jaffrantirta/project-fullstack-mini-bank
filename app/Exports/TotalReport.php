<?php

namespace App\Exports;

use App\Http\Requests\TotalReportRequest;
use App\Models\Transaction;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class TotalReport implements FromView
{
    protected $startDate;
    protected $endDate;
    protected $type;

    public function __construct($startDate, $endDate, $type)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->type = $type;
    }
    public function view(): View
    {
        $transaction = Transaction::with('user')->where('type', $this->type)->whereBetween('created_at', [$this->startDate, $this->endDate])->get();
        return view('exports.report_total', [
            'reports' => $transaction
        ]);
    }
}
