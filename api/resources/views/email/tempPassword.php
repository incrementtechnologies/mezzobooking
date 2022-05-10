@component('email.header')
@endcomponent
<div class="holder">
    <div class="thank-you-header">
        <img src="{{env('APP_URL')}}{{env('PACKAGE_ROUTE')}}/storage/logo/logo.png" height="60px" width="60px">
    </div>
    <div class="content">
        <p>Your temporary password: {{$data['password']}}</p>
    </div>
</div>
@component('email.footer')
@endcomponent