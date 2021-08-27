<template>
  <div style="margin:56px">
      <div><b>Booking Details</b></div>
      <div style="background-color:white; padding: 30px; margin-left:auto; margin-right:auto;">
          <div class="mb-5">
            <span>Booking #:</span>
            <b>MEZZOHOTEL-AMAZINGCODE</b>
            <span style="float:right;color:#CBAB58">Status: Confirmed</span>
          </div>
          <div class="row">
              <div class="col-md-6">
                <label>Start Date</label>
                <div class="input-group">
                    <input type="date" class="form-control-custom form-control">
                </div>
              </div>
               <div class="col-md-6">
                   <div>
                    <label>Number of Adults</label>
                    <div class="input-group">
                        <input type="text" class="form-control-custom form-control" style="border-right-style: none;">
                        <span style="background: white;" class="input-group-addon password">
                            <i class="fas fa-sync-alt" aria-hidden="true"></i>
                        </span>
                    </div>
                   </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-6">
                <label>End Date</label>
                <div class="input-group">
                    <input type="date" class="form-control-custom form-control">
                </div>
              </div>
               <div class="col-md-6">
                   <div>
                    <label>Number of Children</label>
                    <div class="input-group">
                        <input type="text" class="form-control-custom form-control" style="border-right-style: none;">
                        <span style="background: white;" class="input-group-addon password">
                            <i class="fas fa-sync-alt" aria-hidden="true"></i>
                        </span>
                    </div>
                   </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-6">
                <label>Coupon</label>
                <div class="input-group">
                    <input type="text" class="form-control-custom form-control" style="border-right-style: none;">
                    <span style="background: white;" class="input-group-addon password">
                        <i class="fas fa-sync-alt" aria-hidden="true"></i>
                    </span>
                </div>
              </div>
               <div class="col-md-6">
              </div>
          </div>
          <b>Payment Methods</b>
          <div>
              <i class="fa fa-cc-visa" style="font-size: 15px;margin-right: 15px;"></i>
              <span>***3245 - paid</span>
          </div>
        <section  class="mt-3">
            <b>Summary</b><br/>
            <span class="ml-2">Rooms</span>
            <div class="row ml-4">
                <div class="col-md-6">
                    <span>Junior Suit x 2</span>
                    <i class="fa fa-pencil actionBtn"></i>
                </div>
                <div class="col-md-6">
                    <p>PHP 4,0000.00</p>
                </div>
            </div>
            <span class="ml-2">Discount - 10% OFF(MEZZOHOTEL2021)</span>
            <i class="fa fa-pencil actionBtn"></i>
            <i class="fa fa-trash actionBtn"></i>
            <div class="row ml-4">
                <div class="col-md-6">
                </div>
                <div class="col-md-6">
                    <p>PHP 4,0000.00</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <span style="font-weight: bold; font-size:16px">Total</span>
                </div>
                <div class="col-md-6">
                    <p style="font-weight: bold; font-size:16px">PHP 4,0000.00</p>
                </div>
            </div>
        </section>
      </div>
      <section class="mt-3">
        <div><b>Customer Details</b></div>
            <div class="row" style="background-color:white; padding: 20px; margin-left:auto; margin-right:auto;">
                <div class="col-md-6">
                    <span style="font-size:12px">Customer ID: 12334</span><br/>
                    <span style="font-weight:bold; font-size:16px">Test User</span>
                    <p style="font-size:12px">123344556667</p>
                </div>
                <div class="col-md-6" style="padding: 10px 0px">
                    <span>Email Address: <b>testaccount@email.com</b></span>
                </div>
            </div>
      </section>
      <section class="actionBtns mt-3">
          <div class="row" style="margin-left:auto; margin-right:auto;">
              <div class="col-md-6">
                  <button class="btn btn-danger footerBtn">Cancel</button>
                  <button class="btn btn-danger footerBtn">Refund</button>
              </div>
              <div class="col-md-6">
                  <div style="float:right">
                    <button class="btn btn-secondary footerBtn">Confirm</button>
                    <button class="btn btn-primary footerBtn">Complete</button>
                  </div>
              </div>
          </div>
      </section>
			<section  style="margin-left:auto; margin-right:auto;">
				<RoomCard/>
			</section>
  </div>
</template>

<script>
import RoomCard from 'src/generic/RoomCard.vue'
export default {
  components: {
    RoomCard
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
    .form-control-custom{
        width: 300px !important;
        height: 60px !important;
    }
    .icon{
        position: absolute;
        margin-left: 100px;
        height: 25px;
        bottom: 17px;
        right: 30px;
        display: flex;
        align-items: center;
    }
    .icons{
        float: right;
        clear: none;
        margin-right: 2%;
    }
    .input-group-addon{
        width: 15% !important;
        text-align: center !important;
        padding-bottom: 3px !important;
        display: block !important;
        line-height: 43px !important;
    }
    .row{
        margin-bottom: 2%;
    }
    .actionBtn:hover{
        cursor: pointer;
        color: $secondary
    }
    .fa-trash{
        color: red;
    }
    .footerBtn{
        width: 150px;
        height: 50px
    }
</style>
