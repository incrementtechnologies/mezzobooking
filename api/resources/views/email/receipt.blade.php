@component('email.header')
@endcomponent
<span>
    <p>Hi, <span style="font-weight: bold;">{{$dataReceipt['reservee']}}</span></p>
    <br>
    <!-- <br> -->
    <p>Your reservation at <span style="font-weight: bold;">{{$dataReceipt['merchant']}}</span> has been <span style="font-weight: bold;">{{$dataReceipt['status']}}</span>.</p>
    <br>
    <p>Code: <b>{{$dataReceipt['code']}}</b></p>
    <p>Reservee: <b>{{$dataReceipt['reservee']}}</b> </p>
    <p>Date of Reservation: <b>{{$dataReceipt['date']}}</b></p>
    <p>No. of Heads: <b>{{$dataReceipt['number_of_heads']}}</b></p>
    <p>No. of Rooms: <b>{{$dataReceipt['number_of_rooms']}}</b></p><br/>
    <p>Total amount: <b>{{$dataReceipt['total']}}</b></p>
    <br>
    <span>Present above information to verify or as your proof of transaction.</span>
    <br>
    <span><b>Thank you.</b></span>
</span>
@component('email.footer')
@endcomponent