<?php

namespace App\Http\Controllers;

use App\Coupon;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CouponController extends APIController
{
    public function create(Request $request){
        $data = $request->all();
        $res = Coupon::create($data);
        $this->response['data'] = $res;
        return $this->response();
    }

    public function retrieve(Request $request){
        $data = $request->all();
        $con = $data['condition'];
        $res = Coupon::where('account_id', '=', $data['account_id'])
        ->where($con[0]['column'], $con[0]['clause'], $con[0]['value'])
        ->where('deleted_at', '=', null)
        ->limit($data['limit'])
        ->offset($data['offset'])
        ->orderBy(array_keys($data['sort'])[0], array_values($data['sort'])[0])
        ->get();
        $this->response['data'] = $res;
        return $this->response();
    }

    public function retrieveCoupon(Request $request){
        $data = $request->all();
        $con = $data['condition'];
        $res = Coupon::where('account_id', '=', $data['account_id'])
            ->where($con[0]['column'], $con[0]['clause'], $con[0]['value'])
            ->where('deleted_at', '=', null)
            ->get();
        $this->response['data'] = $res;
        return $this->response();
    }

    public function update(Request $request){
        $data = $request->all();
        $res = Coupon::where('id', '=', $data['id'])->update(array(
            'code' => $data['code'],
            'description' => $data['description'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'limit_customer' => $data['limit_customer'],
            'limit_per_customer' => $data['limit_per_customer'],
            'type' => $data['type'],
            'value' => $data['value'],
            'status' => $data['status'],
            'updated_at' => Carbon::now(),
        ));
        $this->response['data'] = $res;
        return $this->response();
    }
}
