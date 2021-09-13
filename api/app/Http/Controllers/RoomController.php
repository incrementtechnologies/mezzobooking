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

    public function retrieve(Request $request){
        $data = $request->all();
        $con = $data['condition'];
        $res = Room::where('account_id', '=', $data['account_id'])
        ->where($con[0]['column'], $con[0]['clause'], $con[0]['value'])
        ->where('deleted_at', '=', null)
        ->limit($data['limit'])
        ->offset($data['offset'])
        ->orderBy(array_keys($data['sort'])[0], array_values($data['sort'])[0])
        ->get();
        $this->response['data'] = $res;
        return $this->response();
    }
}
