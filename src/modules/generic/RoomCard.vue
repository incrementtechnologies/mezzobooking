<template>
  <div class="row">
    <div class="col-12 mt-3">
      <div class="card" style="min-height: 240px">
        <div class="card-horizontal">
          <div class="img-square-wrapper">
            <img class="" style="min-height: 240px; width:240px" src="http://via.placeholder.com/300x180" alt="Card image cap">
          </div>
          <div class="card-body">
            <div class="mb-4">
              <!-- //lacking of room_type -->
              <span style="text-transform: uppercase;"><b>{{list.title}}</b><b style="border-style: ridge; color: gray; margin-left: 1%">sample</b></span>
              <!-- //lacking of currency and price terms -->
              <span style="float:right"><b>PHP{{list.price !== null ? list.price : 'No indicated price'}}/Night</b><i class="fa fa-pencil ml-2"></i></span>
            </div>
            <p class="card-text">{{list.description !== null ? list.description : 'No description'}}</p>
            <div class="row">
              <!-- // lacking selectedFeature -->
              <div class="col-md-6">
                <span><i class="fa fa-check"></i></span>
                <span>1 Queen Bed</span>
              </div>
              <div class="col-md-6">
                <span><i class="fa fa-check"></i></span>
                <span>In-room Safety Deposit Box</span>
              </div>
            </div>
            <div class="row">
              <!-- // lacking of addOns -->
              <div class="col-md-6">
                <span><i class="fa fa-check"></i></span>
                <span>Bath Tub</span>
              </div>
              <div class="col-md-6">
                <span><i class="fa fa-check"></i></span>
                <span>Comfort Room</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <span><i class="fa fa-check"></i></span>
                <span>High-speed internet access</span>
              </div>
            </div>
            <div class="mt-3" v-if="actionBtn===true">
              <button class="btn btn-primary" style="height: 50px; width:150px">Bookings</button>
              <button class="btn btn-secondary" style="height: 50px; width:150px">Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['actionBtn', 'list']
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
  .card-horizontal {
    display: flex;
    flex: 1 1 auto;
    min-height: 240px;
  }
  .fa-check {
    color: $secondary
  }
</style>

