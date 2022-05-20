@component('email.header')
@endcomponent
<div class="holder">
    <div class="thank-you-header">
        <img src="{{env('APP_URL')}}/public/{{env('PACKAGE_ROUTE')}}/storage/logo/logo.png" height="60px" width="60px">
        <h1 style="line-height: 70px;">Thank you for making it Mezzo, {{$dataReceipt['reservee']}}!</h1>
        <h3>Order #: {{$dataReceipt['code']}}</h3>
        <p>Your reservation at <span style="font-weight: bold;">{{$dataReceipt['merchant']}}</span> is currently <span style="font-weight: bold;">waiting for approval</span>.</p>
    </div>
    <div class="content">
        <p>Reservee: <b>{{$dataReceipt['reservee']}}</b> </p>
        <p>Date of Reservation: <b>{{$dataReceipt['date']}}</b></p>
        <p>No. of Heads: <b>{{$dataReceipt['number_of_heads']}}</b></p>
        <p>No. of Rooms: <b>{{$dataReceipt['number_of_rooms']}}</b></p>
        <p>Way of Payment: <b>{{($dataReceipt['payment_method'] == 'credit' ? 'Credit/Debit Card' : $dataReceipt['payment_method'] == 'checkIn') ? 'Upon check-in' : 'Through bank'}}</b></p>
        <p>Total amount: <b>{{$dataReceipt['total']}}</b> - <b>{{$dataReceipt['payment_method'] == 'credit' ? 'Paid' : 'Not Yet Paid'}}</b></p>
        <p><i>NOTE: </i>Present this receipt upon arriving to Mezzo Hotel to verify or as your proof of transaction.</p>
        <p><b>Thank you very much</b></p>
    </div>
</div>
@component('email.footer')
@endcomponent