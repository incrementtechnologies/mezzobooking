@component('email.header')
@endcomponent
<span>
    <p>Hi, <span style="font-weight: bold;">{{$data['reservee']}}</span></p>
    <br>
    <!-- <br> -->
    <p>Your reservation at <span style="font-weight: bold;">{{$data['merchant']}}</span> has been <span style="font-weight: bold;">{{$data['status']}}</span>.</p>
    <br>
    <p>Code: <b>{{$data['code']}}</b></p>
    <p>Reservee: <b>{{$data['reservee']}}</b> </p>
    <p>Date of Reservation: <b>{{$data['date']}}</b></p>
    <p>No. of Heads: <b>{{$data['number_of_heads']}}</b></p>
    <p>No. of Rooms: <b>{{$data['number_of_rooms']}}</b></p><br/>
    <p>Total amount: <b>{{$data['total']}}</b></p>
    <br>
    <span>Present above information to verify or as your proof of transaction.</span>
    <br>
    <span><b>Thank you.</b></span>
</span>
@component('email.footer')
@endcomponent