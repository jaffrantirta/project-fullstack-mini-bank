<?php

namespace App\Models;

use App\Traits\LogsDefaultOptions;
use Bavix\Wallet\Models\Transaction as ModelsTransaction;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends ModelsTransaction
{
    use LogsDefaultOptions;
    public function account(): HasOne
    {
        return $this->hasOne(TransactionAccount::class);
    }
    public function code(): HasOne
    {
        return $this->hasOne(TransactionCode::class);
    }
}
