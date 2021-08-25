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
                          <span><b>Junior Suite</b></span>
                          <span style="float:right"><b>P2,000/Night</b><i class="fa fa-pencil ml-2"></i></span>
                        </div>
                        <p class="card-text">For a more luxurious experience, our 30 sqm Junior Suite offers a posh set-up, allowing a relaxing bathing experience in the bath tub to cap off the busy day.</p>
                        <div class="row">
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
                          <div class="col-md-6">
                            <span><i class="fa fa-check"></i></span>
                            <span>Bath Tub</span>
                          </div>
                          <div class="col-md-6">
                            <span><i class="fa fa-check"></i></span>
                            <span>Complimentary high-speed internet access</span>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <span><i class="fa fa-check"></i></span>
                            <span>Lounge Sofa</span>
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
  props: ['actionBtn']
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

