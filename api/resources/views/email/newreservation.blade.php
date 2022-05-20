@component('email.header')
@endcomponent
<span class="text">
    <h3>New Reservation has made</h3>
    <br>
    <br>
     A new reservation has made by <b>{{$data['name']}}</b>
    <br>
    <br>
    To see the full details, sign in to <a href="{{env('APP_FRONT_END_URL')}}">Mezzo Admin</a>
</span>
@component('email.footer')
@endcomponent