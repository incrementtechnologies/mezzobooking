@component('email.header')
@endcomponent

<div class="holder">
    <div class="contents">
        <p>We have an update regarding your reservation with reservation code: {{$data['code']}} 
        </p><br/>

        <p>You may transfer your payment to the following details below: 
        </p><br/>

        <p>Bank: RCBC</p>
        <p>Account Name: Royal Henda Int'l Inc.</p>
        <p>Account Number: 7590539831</p>
        <br/>

        <p>Once completed, kindly send the proof of payment to  <a href="reservation@mezzohotel.com" target="__blank">reservation@mezzohotel.com</a></p>
        <br/>
        <p>Thank you very much!</p>
        
    </div>
</div>

@component('email.footer')
@endcomponent