<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
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
        'limit_per_customer',
        'start_date',
        'end_date',
        'payload',
        'payload_value',
        'status'
    ];
}
