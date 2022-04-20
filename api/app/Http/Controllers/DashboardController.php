<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;

class DashboardController extends APIController
{
    public function retrieve(Request $request){
        $data = $request->all();
        $currDate  = Carbon::now();
        $months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        $totalBookings = app('Increment\Hotel\Room\Http\CartController')->getTotalBookings($currDate);
        $totalSales = app('Increment\Hotel\Reservation\Http\ReservationController')->retrieveSaleByCoupon(null, null);
        $dates = app('Increment\Hotel\Room\Http\CartController')->getMaxMinDates();
        $bookings = app('Increment\Hotel\Room\Http\CartController')->getTotalBookings(null);
        $totalBookingsOfYear = 0;
        $totalRevenue = 0;
        for ($i=0; $i <= sizeof($months)-1; $i++) { 
            $item = $months[$i];
            $start = Carbon::createFromFormat('m', $item)->firstOfMonth();
            $end = Carbon::createFromFormat('m', $item)->endOfMonth();
            $bookingsPerMonth = app('Increment\Hotel\Room\Http\CartController')->getTotalBookingsPerMonth($start, $end);
            $totalSalesPerMonth = app('Increment\Hotel\Reservation\Http\ReservationController')->retrieveSaleByDate($start, $end);
            $totalBookingsOfYear += intval($bookingsPerMonth);
            $totalRevenue += (float)$totalSalesPerMonth;
        }
        $result = array(
            'previous' => $totalBookings['previous'],
            'upcomming' => $totalBookings['upcommings'],
            'average_bookings' => number_format($totalBookingsOfYear / 12, 2, '.', ''),
            'average_revenue' => number_format($totalSalesPerMonth, 2, '.', ''),
            'total_sales' => $totalSales[0]['total']
        );
        $this->response['data'] =$result;
        return $this->response();
    }
}
