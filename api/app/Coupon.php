<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $table = 'coupons';
    protected $fillable = ['account_id', 'code', 'description', 'type', 'value', 'start_date', 'end_date', 'limit_customer', 'limit_per_customer', 'status'];
}
