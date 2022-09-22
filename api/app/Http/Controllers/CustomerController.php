<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

class CustomerController extends APIController
{
    //
    public $reservationController = 'Increment\Imarket\Reservation\Http\ReservationController';

    public function retrieve(Request $request){
        $data = $request->all();
        $res = Customer::leftJoin('accounts as T1', 'T1.id', '=', 'customers.account_id')
            ->leftJoin('account_informations as T2', 'T2.account_id', 'T1.id')
            ->get(['customers.id', 'T1.email', 'T1.username','T2.cellular_number', 'T2.first_name', 'T2.last_name', 'T1.id as account_id']);
        for ($i=0; $i <= sizeof($res)-1 ; $i++) { 
            $item = $res[$i];
            $res[$i]['total_bookings'] = app($this->reservationController)->retrieveTotalReservationsByAccount($item['account_id']);
            $res[$i]['total_spent'] = app($this->reservationController)->retrieveTotalSpentByAcccount($item['account_id']);
            $res[$i]['name'] = $item['first_name'].' '.$item['last_name'];
        }
        $this->response['data'] = $res;
        return $this->response();
    }
}
