<?php

namespace App\Http\Controllers;

use App\Room;
use Illuminate\Http\Request;

class RoomController extends APIController
{
    //
    public function retrieveTotalPriceById($account_id, $column, $value, $returns){
        return Room::where($column, '=', $value)->where('account_id', '=', $account_id)->get($returns);
    }
}
