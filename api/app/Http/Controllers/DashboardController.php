<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends APIController
{
    public function retrieve(Request $request){
        $data = $request->all();
        $currDate  = Carbon::now();
        $totalBookings = app('Increment\Hotel\Room\Http\CartController')->getTotalBookings($currDate);
        $totalSales = app('Increment\Hotel\Reservation\Http\ReservationController')->retrieveSaleByCoupon(null, null);
        $result = array(
            'previous' => $totalBookings['previous'],
            'upcomming' => $totalBookings['upcommings'],
            'average_bookings' => 0,
            'average_revenue' => 0,
            'total_sales' => $totalSales[0]['total']
        );
        $this->response['data'] =$result;
        return $this->response();
    }
}
