<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\APIModel;

class RoomCoupon extends APIModel
{
    protected $table = 'room_coupons';
    protected $fillable = ['payload', 'payload_value', 'coupon_id'];
}
