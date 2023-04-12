<?php

namespace App\Models;

use App\Traits\LogsDefaultOptions;
use Bavix\Wallet\Models\Transaction as ModelsTransaction;

class Transaction extends ModelsTransaction
{
    use LogsDefaultOptions;
    public $appends = ['type_att', 'amount_number_format'];
    public function getTypeAttAttribute()
    {
        return $this->type === 'deposit' ? 'debit' : 'kredit';
    }
    public function getAmountNumberFormatAttribute()
    {
        return number_format($this->amount);
    }
}
