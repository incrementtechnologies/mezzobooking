<template>
    <table class="table table-bordered table-responsive">
      <div class="card" style="min-height: 240px">
        <div class="card-horizontal">
          <div class="leftSide">
            <div class="imageContainer">
              <img class="image" :src="list.images.length > 0 ? list.images[0].url.includes('https') ? list.images[0].url : config.BACKEND_URL + list.images[0].url : 'http://via.placeholder.com/300x180'" alt="Card image cap">
            </div>
          </div>
          <div class="card-body">
            <div class="mb-4">
              <span style="text-transform: uppercase;"><b>{{list.room_type}}</b></span>
            <span style="float:right;" class="d-flex">
              <div>
                <b>{{list.currency != null ? list.currency : 'PHP'}} {{$format.format(list.room_price)}}/<span style="text-transform: capitalize">{{list.price_label != null ? list.price_label : 'No Label'}}</span></b>
                <p>{{list.tax === 1 ? '(Including tax & fees)' : null}}</p>
              </div>
              <div @click="$router.push('/add-rooms/'+ list.code)">
                <i class="fas fa-pencil-alt ml-2"></i>
              </div>
            </span>
            </div>
            <p class="card-text" style="margin-top: 3%">{{list.general_description !== null ? list.general_description : 'No description'}}</p>
            <div v-if="list.general_features.length > 0" class="col-md-6" v-for="(item, index) in list.general_features" :key="index">
                <i class="fas fa-check checkIcon" ></i>
                <span>{{item.title || item.payload_value}}</span>
            </div>
            <!-- <div class="row" v-if="Object.values(list.additional_info).length > 0">
              <div class="col-md-6" v-for="(item, index) in Object.vadlues(list.additional_info)" :key="index">
                <div v-for="(x, index) in item" :key="index">
                  <span><i class="fa fa-check"></i></span>
                  <span>{{x.title || x.payload_value}}</span>
                </div>
              </div>
            </div> -->
            <div class="mt-1" v-if="actionBtn===true">
              <button @click="$router.push('/own-bookings/' + list.title)" class="btn btn-primary" style="height: 50px; width:150px">Bookings</button>
              <button @click="$router.push('/add-rooms/'+ list.code + '/' + list.title)" class="btn btn-secondary" style="height: 50px; width:150px">Details</button>
            </div>
          </div>
        </div>
      </div>
    </table>
</template>

<script>
import CONFIG from 'src/config.js'
export default {
  props: ['actionBtn', 'list'],
  mounted(){
  },
  data(){
    return {
      config: CONFIG
    }
  },
  methods: {
    edit(){
      this.$emit('isUpdate', this.list)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
  .leftSide{
    width: 50%;
    height: auto;
  }
  .imageContainer{
    // height: 100px;
    position:relative;
    overflow:hidden;
    padding-bottom:100%;
  }
  .image {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    position: absolute
  }
  .card-body{
    width: 70%;
  }
  .card-horizontal {
    display: flex;
    flex: 1 1 auto;
    min-height: 240px;
    width: 100%;
  }
  .fa-check {
    color: $secondary
  }
  p{
    word-break: break-word !important;
    width: 95%;
  }
</style>

