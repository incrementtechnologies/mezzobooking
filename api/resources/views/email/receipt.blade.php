@component('email.header')
@endcomponent
<div class="holder">
    <p>Dear {{$dataReceipt['reservee']}},</p><br>
    <p>Thank You for making it Mezzo!</p>
    <p>We have an update regarding your reservation with reservation code: <span class="text-secondary">{{$dataReceipt['code']}}</span></p><br>
    <p>Your Reservation is <b>{{$dataReceipt['status'] == 'for_approval' ? 'waiting for approval' : $dataReceipt['status']}}</b></p>
    <div class="content">
        <table id="table">
            <tbody class="tableBody">
                <tr>
                    <td>Payment Method:</td>
                    <td>{{$dataReceipt['payment_method']}}</td>
                </tr>
                <tr>
                    <td>Guest Name:</td>
                    <td>{{$dataReceipt['reservee']}}</td>
                </tr>
                <tr>
                    <td>Arrival Date:</td>
                    <td>{{$dataReceipt['check_in']}}</td>
                </tr>
                <tr>
                    <td>Departure Date:</td>
                    <td>{{$dataReceipt['check_out']}}</td>
                </tr>
                <tr>
                    <td>Number of Nights(s):</td>
                    <td>{{$dataReceipt['number_of_nights']}}</td>
                </tr>
                <tr>
                    <td>Number of Guests(s):</td>
                    <td>{{$dataReceipt['adults']}} Adults, {{$dataReceipt['children']}} Child</td>
                </tr>
                <tr>
                    <td>Room Type:</td>
                    <td>{{$dataReceipt['room_type']}}</td>
                </tr>
                <tr>
                    <td>Room Charge:</td>
                    <td>PHP {{$dataReceipt['total']}}</td>
                </tr>
                <tr>
                    <td>Inclusions:</td>
                    <td>{{sizeOf($dataReceipt['add_ons']) <= 0 ? 'N/A' : $dataReceipt['add_ons']}}</td>
                </tr>
            </tbody>
        </table>
    </div>
    @component('email.genericContent')
    @endcomponent 
</div>
@component('email.footer')
@endcomponent