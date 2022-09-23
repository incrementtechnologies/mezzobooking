<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\APIModel;
class Coupon extends APIModel
{
    protected $table = 'coupons';
    protected $fillable = [
        'account_id',
        'code',
        'description',
        'currency',
        'country',
        'locality',
        'amount',
        'limit',
        'type',
        'limit_per_customer',
        'start_date',
        'end_date',
        'payload',
        'payload_value',
        'status'
    ];
    
}
