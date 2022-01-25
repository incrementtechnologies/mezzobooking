<?php

namespace App\Http\Controllers;

use App\Coupon;
use App\RoomCoupon;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CouponController extends APIController
{
    public function create(Request $request){
        $data = $request->all();
        $codeExist = Coupon::where('code', '=', $data['code'])->first();
        $targets = json_decode($data['selectedType']);
        $couponId = null;
        if($codeExist === null){
            $res = Coupon::create($data);
            $couponId = $res['id'];
            for ($i=0; $i <= sizeof($targets)-1; $i++) {
                $item = $targets[$i];
                $parameter = array(
                    'payload' => 'target_room',
                    'payload_value' => $item->id,
                    'coupon_id' => $couponId
                );
                RoomCoupon::create($parameter);
            }
            $this->response['data'] = $res;
        }else{
            $this->response['data'] = [];
            $this->response['error'] = 'Coupon is already existed';
        }
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

        $size = Coupon::where('account_id', '=', $data['account_id'])
        ->where($con[0]['column'], $con[0]['clause'], $con[0]['value'])
        ->where('deleted_at', '=', null)
        ->orderBy(array_keys($data['sort'])[0], array_values($data['sort'])[0])
        ->get();

        $this->response['data'] = $res;
        $this->response['size'] = sizeof($size);
        return $this->response();
    }

    public function retrieveCoupon(Request $request){
        $data = $request->all();
        $con = $data['condition'];
        $res = Coupon::where('account_id', '=', $data['account_id'])
            ->where($con[0]['column'], $con[0]['clause'], $con[0]['value'])
            ->where('deleted_at', '=', null)
            ->first();
        $roomCoupons = RoomCoupon::where('coupon_id', '=', $res['id'])->where('deleted_at', '=', null)->get();
        $targets = array();
        for ($i=0; $i <= sizeof($roomCoupons)-1 ; $i++) {
            $item = $roomCoupons[$i];
            if($item['payload_value'] === 'All'){
                $temp = array(
                    'payload_value' => 'All',
                    'id' => 'All'
                );
                array_push($targets, $temp);
            }else{
                array_push($targets, app('Increment\Common\Payload\Http\PayloadController')->retrieveByParams($item['payload_value']));
            }
        }
        $res['target'] = $targets;
        $this->response['data'] = $res;
        return $this->response();
    }

    public function update(Request $request){
        $data = $request->all();
        $res = Coupon::where('id', '=', $data['id'])->update(array(
            'code' => $data['code'],
            'description' => $data['description'],
            'currency' => $data['currency'],
            'amount' => $data['amount'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'limit' => $data['limit'],
            'limit_per_customer' => $data['limit_per_customer'],
            'status' => $data['status'],
            'updated_at' => Carbon::now(),
        ));
        $exist = RoomCoupon::where('coupon_id', '=', $data['id'])->where('deleted_at', '=', null)->get();
        if(sizeOf($exist) > 0) {
            $targets = json_decode($data['selectedType']);
            for ($i=0; $i <= sizeof($targets) -1 ; $i++) { 
                $item = $targets[$i];
                $existTarget = RoomCoupon::where('payload_value', '=', $item->id)->where('coupon_id', '=', $data['id'])->where('deleted_at', '=', null)->first();
                if($existTarget === null){
                    RoomCoupon::where('coupon_id', '=', $data['id'])->where('deleted_at', '=', null)->update(array(
                        'deleted_at' => Carbon::now()
                    ));
                    $parameter = array(
                        'payload' => 'target_room',
                        'payload_value' => $item->id,
                        'coupon_id' => $data['id']
                    );
                    RoomCoupon::create($parameter);
                }
            }
        }
        $this->response['data'] = $res;
        return $this->response();
    }

    public function apply(Request $request){
		$data = $request->all();
		$result = Coupon::where('code', '=', $data['code'])->first();
        $noOfCouponUsed = app('Increment\Hotel\Reservation\Http\ReservationController')->countByIds($data['account_id'], $result['id']);
        $noOfPersonUseCoupon = app('Increment\Hotel\Reservation\Http\ReservationController')->countByIds(null, $result['id']);
        $reservation = app('Increment\Hotel\Reservation\Http\ReservationController')->getByIds($data['account_id'], 'in_progress');
        $currDate = Carbon::now();
		if($result !== null){
            if($result['end_date'] > $currDate->format('Y-m-d H:i:s')){
                if((int)$result['limit'] > (int)$noOfPersonUseCoupon){
                    if((int)$noOfCouponUsed < (int)$result['limit_per_customer']){
                        $this->response['data'] = $result;
                        app('Increment\Hotel\Reservation\Http\ReservationController')->updateByCouponCode($result['id'], $reservation['id']);
                    }else{
                        $this->response['error'] = "You've reach your maximum application of the same coupon";
                    }
                }else{
                    $this->response['error'] = "Coupon is not available";
                }
            }else{
                $this->response['error'] = "Coupon was expired";
            }
		}else{
			$this->response['error'] = "Coupon code does not exist";
		}
		return $this->response();
	}
    
    public function retrieveByReservation(Request $request){
        $data = $request->all();
        $reservation = app('Increment\Hotel\Reservation\Http\ReservationController')->getByIds($data['account_id'], $data['status']);
        if($reservation !== null){
            $this->response['data'] = Coupon::where('id', '=', $reservation['coupon_id'])->first();
        }
        return $this->response();
    }

    public function retrieveGeneralSale(Request $request){
        $data = $request->all();
        $con = $data['condition'];
        $result = Coupon::where($con[0]['column'], $con[0]['clause'], $con[0]['value'])
            ->orderBy(array_keys($data['sort'])[0], array_values($data['sort'])[0])
            ->limit($data['limit'])
            ->offset($data['offset'])->get();
        
        $size = Coupon::where($con[0]['column'], $con[0]['clause'], $con[0]['value'])->get();
        if(sizeof($result) > 0){
            for ($i=0; $i <= sizeof($result)-1; $i++) {
                $item = $result[$i];
                $result[$i]['total_sale'] = app('Increment\Hotel\Reservation\Http\ReservationController')->retrieveSaleByCoupon('coupon_id', $item['id']);
                $result[$i]['start_date'] = Carbon::createFromFormat('Y-m-d H:i:s', $item['start_date'])->copy()->tz($this->response['timezone'])->format('F d, Y');
                $result[$i]['end_date'] = Carbon::createFromFormat('Y-m-d H:i:s', $item['end_date'])->copy()->tz($this->response['timezone'])->format('F d, Y');
            }
        }
        $this->response['data'] = $result;
        $this->response['size'] = sizeOf($size);
        return $this->response();
    }

    public function retrieveById($couponId){
        return Coupon::where('id', '=', $couponId)->first();
    }
    public function delete(Request $request){
        $data = $request->all();
        $result = Coupon::where('id', '=', $data['id'])->update(array(
            'deleted_at' => Carbon::now()
        ));
        $this->response['data'] = $result;
        return $this->response();
    }
}
