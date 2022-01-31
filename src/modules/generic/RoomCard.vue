<template>
  <div class="row">
    <div class="col-12 mt-3">
      <div class="card" style="min-height: 240px">
        <div class="card-horizontal">
          <div class="img-square-wrapper">
            <img class="" style="min-height: 240px; width:240px; height: 240px" :src="list.images.length > 0 ? config.BACKEND_URL + list.images[0].url : 'http://via.placeholder.com/300x180'" alt="Card image cap">
          </div>
          <div class="card-body">
            <div class="mb-4">
              <span style="text-transform: uppercase;"><b>{{list.title}}</b><b style="border-style: ridge; color: gray; margin-left: 1%; font-size: 10px; padding: 3px;" v-if="list.category != null && list.category.payload_value !== undefined">{{list.category.payload_value}}</b></span>
              <span style="float:right"><b>{{list.currency != null ? list.currency : 'PHP'}}{{list.regular != null ? list.regular : 0}}/{{list.label != null ? list.label : 'No Label'}}</b><i @click="$router.push('/add-rooms/'+ list.code)" class="fas fa-pencil-alt ml-2"></i></span>
            </div>
            <p class="card-text">{{list.description !== null ? list.description : 'No description'}}</p>
            <div class="row mt-2" v-if="list.additional_info !== null">
              <div v-if="list.additional_info.feature.length > 0" class="col-md-6" v-for="(item, index) in list.additional_info.feature" :key="index">
                  <i class="fas fa-check checkIcon" ></i>
                  <span>{{item.title || item.payload_value}}</span>
              </div>
              <div v-if="list.additional_info.add_ons.length > 0" class="col-md-6" v-for="(item, index) in list.additional_info.add_ons" :key="index">
                  <i class="fas fa-check checkIcon" ></i>
                  <span>{{item.title || item.payload_value}}</span>
              </div>
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
    </div>
  </div>
</template>

<script>
import CONFIG from 'src/config.js'
export default {
  props: ['actionBtn', 'list'],
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

