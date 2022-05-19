@component('email.header')
@endcomponent

<div class="holder">
    <div class="contents">
        <p>Dear {{$data['name']}},</p><br/>
        
        <p class="subHeader">Thank you for making it Mezzo!</p><br/>
        <p>We have an update regarding to your reservation with reservation code: {{$data['code']}}
        </p>

        <p>
            Your reservation is <b>{{$data['status']}}</b>        
        </p>
        <p>Please contact us in <a href="reservation@mezzohotel.com" target="__blank">reservation@mezzohotel.com</a> for more information about your reservation.
        <br/>

        <p>Christine Bernardo</p>
        <p>Hotel Manager</p>

        <div class="icon">
            <a href="https://www.facebook.com/mezzohotelcebu" target="__blank">@icon('facebook')</a>
        </div>
        <p>[032 (231-0777) | reservation@mezzohotel.com]</p>
    </div>
</div>

@component('email.footer')
@endcomponent