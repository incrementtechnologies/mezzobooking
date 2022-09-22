@component('email.header')
@endcomponent

<div class="holder">
    <div class="contents">
        <p>We have an update regarding the reservation code: {{$data['code']}}
        </p>

        <p>The reservation is <b>{{$data['status']}} on {{$data['date_cancelled']}}</b></p><br/>
        <p>Booking Status: 	{{$data['status']}}</p>
        <p>Guest Name: 	{{$data['name']}}</p>
        <p>Arrival Date: 	{{$data['check_in']}}</p>
        <p>Departure Date: 	{{$data['check_out']}}</p>
        <p>Number of Night(s): {{$data['nights']}}</p>
        <p>Number of Guest(s): {{$data['adults']}} Adults, {{$data['children']}} Child</p>
        <p>Room Type:		{{$data['room_types']}}</p>
        <p>Room Charges: 	PHP {{$data['total']}}</p>
        <p>Inclusions: 		{{$data['add_ons']}}</p><br/>

        <p>Reservations</p>

        <div class="icon">
            <a href="https://www.facebook.com/mezzohotelcebu" target="__blank">@icon('facebook')</a>
        </div>
        <p>[032 (231-0777) | reservation@mezzohotel.com]</p>
    </div>
</div>

@component('email.footer')
@endcomponent