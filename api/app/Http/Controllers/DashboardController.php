<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends APIController
{
    public function retrieve(Request $request){
        $data = $request->all();
        $currDate  = Carbon::now();
        $totalBookings = app('Increment\Hotel\Reservation\Http\ReservationController')->getTotalBookings($currDate);
        $result = array(
            'previous' => $totalBookings['previous'],
            'upcomming' => $totalBookings['upcommings'],
            'average_bookings' => 0,
            'average_revenue' => 0,
            'total_sales' => 0
        );
        $this->response['data'] =$result;
        return $this->response();
    }
}
