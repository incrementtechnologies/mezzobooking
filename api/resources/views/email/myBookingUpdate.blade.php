@component('email.header')
@endcomponent

<div class="holder">
    <div class="contents">
        <p>Dear {{$user['name']}},</p><br/>
        
        <p class="subHeader">Thank you for making it Mezzo!</p><br/>
        <p>We are delighted that you chose Mezzo Hotel as your temporary home from [Date of Stay]. Our top priority is making sure our guests feel safe and comfortable during their stay—we hope Mezzo's above and beyond service helped achieve that. 
        </p>

        <p>If you loved your Mezzo experience, please rate us and <a href="https://www.tripadvisor.com.ph/Hotel_Review-g298460-d12301041-Reviews-Mezzo_Hotel-Cebu_City_Cebu_Island_Visayas.html" target="__blank">leave a review</a>. 
            If we fell short on your expectations, kindly <a href="reservation@mezzohotel.com" target="__blank">send us a message</a> so we can make it up to you. Your feedback means the world to us.
        </p>

        <p>We hope you had a pleasant stay with Mezzo and that your next destination will likewise be wonderful. Until next time!</p>
        <br/>

        <p>Your Mezzo Family</p><br/>
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