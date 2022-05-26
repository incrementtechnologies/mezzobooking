@component('email.header')
@endcomponent

<div class="holder">
    <div class="contents">
        @if($data['status'] !== 'refunded')
            <p>Dear {{$data['name']}},</p><br/>
            
            <p class="subHeader">Thank you for making it Mezzo!</p><br/>
            <p>We have an update regarding your reservation with reservation code: {{$data['code']}}
            </p>

            <p>Your reservation is <b>{{$data['status']}}</b></p><br/>
            <p>Booking Status: 	{{$data['booking_status']}}</p>
            <p>Guest Name: 	{{$data['name']}}</p>
            <p>Arrival Date: 	{{$data['check_in']}}</p>
            <p>Departure Date: 	{{$data['check_out']}}</p>
            <p>Number of Night(s): {{$data['nights']}}</p>
            <p>Number of Guest(s): {{$data['adults']}} Adults, {{$data['children']}} Child</p>
            <p>Room Type:		{{$data['room_types']}}</p>
            <p>Room Charges: 	PHP {{$data['total']}}</p>
            <p>Inclusions: 		{{$data['add_ons']}}</p>
        @else
            <p>We have an update regarding your reservation with reservation code: {{$data['code']}}</p>
            <p>This is to inform you that your refund request has been processed. Turnaround time varies per issuing bank. If not yet posted, kindly contact your issuing bank.</p>
            <p>If you need more information, please feel free to email us at <a href="reservation@mezzohotel.com" target="__blank">reservation@mezzohotel.com</a> or reach out through Viber/Whatsapp +63 917 139 7204 and we would be happy to assist.</p>
        @endif

        @if($data['status'] === 'confirmed')
            <b>Remarks: </b><br/>

            <b>Check-In/Out Time</b>
            <p>The Hotel's Standard check-in time is 14:00 and check-out time is 12:00 local time. Early check-in or late check-out requests are subject to room availability. Fees may apply. </p><br/>

            <b>Facilities</b>
            <p>Swimming Pool and Gym is open daily from 06:00 to 21:00.
            Outlets
            Café Mezzo, a restaurant inspired with a wide range of cuisine from local to international, cooking to please every palate. It is open daily from 06:00 to 21:00. </p><br/>

            <b>Transfer Arrangement </b>
            <p>Mezzo Hotel is roughly 11 km or 30-45 minutes away from Mactan-Cebu International Airport.
            For a seamless experience, we are pleased to offer you an airport transfer arrangement with a choice of Sedan or Van. Prior reservation is required, kindly advise your full flight details at least 24 hours in advance. You may choose from the options below:</p>
            
            <div style="margin-left: 50px">
                <p>Sedan (maximum of 4 passengers) Php 800.00</p>
                <p>Van (maximum of 7 passengers) Php 1,500.00</p>
            </div><br/>

            <b>City Tours</b>

            <p>Skip the hassle and book a tour!</p>

            <p>Make the most of each moment of your stay here in Cebu City, the Queen City of the South. Enjoy the famous tourist destinations from the city's historic and cultural sites, panoramic vistas, to the best beaches. Let us know if you wish to know more and we would be glad to accommodate you. </p><br/>


            <b>Spa</b>

            <p>Give your body a well-deserved pamper session and avail a massage service at the comforts of your hotel room. You may approach any of our front desk associates for reservations.</p><br/>
            
            <p>Data Privacy</p>
            <p>We value you your privacy. Any personal data that we have collected during the reservation process will be handled in accordance to our privacy policy. To know more, you may visit this <a href="https://mezzohotel.com/privacy-policy">link</a>.</p><br/><br/>
        
        @elseif($data['status'] === 'cancelled')
            <p>Cancellation Charge: 0.00 <span style="color:red">(amount may depend according to cancellation policy)<span><p><br/>
            <p>Cancellation and Change Policy:<p>
            <p>Any cancellation received within 3 days prior to arrival date will incur the first night charge. Failure to arrive at your hotel or property will be treated as a No-Show and no refund will be given (Property policy).</p>
        
        @endif


        <p>Reservations</p>

        <div class="icon">
            <a href="https://www.facebook.com/mezzohotelcebu" target="__blank">@icon('facebook')</a>
        </div>
        <p>[032 (231-0777) | {{env('MAIL_TO_ADDRESS')}}]</p>
    </div>
</div>

@component('email.footer')
@endcomponent