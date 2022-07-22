<template>
    <div style="margin: 56px">
      <span>
          <span @click="$router.push(`/${$route.params.parentRoute}`)" class="backBtn">
              <i class="fas fa-chevron-left"></i>
              Back
          </span>
      </span>
      <span style="float:right">
          <span>
              <b class="actionBtn" @click="create()">Save</b>
          </span>
      </span>
      <section class="mt-5">
        <label class="text-danger">{{errorMessage}}</label>
        <div class="row mb-3">
          <div class="col-md-6">
            <label>Room Type</label>
            <div class="input-group">
              <select @change="getSelectedType" class="form-control-custom form-control" v-if="$route.params.id !== undefined">
                <option v-for="(each, idx) in types" :key="idx" :value="each.id" :selected="routeParams !== undefined && parseInt(routeParams) === parseInt(each.id) ? true : false">{{each.payload_value}}</option>
              </select>
              <select v-model="routeParams" class="form-control-custom form-control" v-if="$route.params.id === undefined">
                <option v-for="(each, idx) in types" :key="idx" :value="each.id" >{{each.payload_value}}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <label>Number of Rooms</label>
            <div class="input-group">
                <input v-model="limit" type="number" min="1" @input="event => limit = Math.abs(event.target.value)" class="form-control-custom form-control">
            </div>
          </div>
        </div>
        <!-- <div class="row mb-3">
          <div class="col-md-12">
            <label>Limits of Reservations per day</label>
            <div class="input-group">
                <input v-model="limitPerday" type="number" min="1" @input="event => limitPerday = Math.abs(event.target.value)" class="form-control-custom form-control">
            </div>
          </div>
        </div> -->
        <div class="row">
          <div class="col-md-6">
            <label>Start Date</label>
            <div class="input-group">
                <input v-model="start_date" type="date" class="form-control-custom form-control">
            </div>
          </div>
          <div class="col-md-6">
            <label>End Date</label>
            <div class="input-group">
                <input v-model="end_date" type="date" class="form-control-custom form-control">
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
import AUTH from 'src/services/auth'
import moment from 'moment'
export default {
  mounted() {
    console.log('========', this.$route)
    this.retrieveType()
    if(this.$route.params.parentRoute !== undefined && this.$route.params.parentRoute !== 'general-limit') {
      this.routeParams = this.$route.params.id !== undefined ? this.$route.params.id : null
    }
    if(this.$route.params.id !== undefined){
      this.retrieve()
    }
  },
  data: () => ({
    types: [],
    user: AUTH,
    type: null,
    start_date: null,
    end_date: null,
    limit: null,
    errorMessage: null,
    routeParams: null,
    data: null,
    limitPerday: null
  }),
  methods: {
    retrieve(){
      let params = {
        condition: [
          {
            column: this.$route.params.parentRoute !== 'general-limit' ? 'payload_value' : 'id',
            clause: '=',
            value: this.$route.params.id
          },
          {
            column: 'payload',
            clause: '=',
            value: 'room_type'
          }
        ]
      }
      this.APIRequest('availabilities/retrieve_by_id', params, response => {
        if(response.data.length > 0){
          this.data = response.data[0]
          this.limit = this.data.limit
          this.routeParams = parseInt(this.data.payload_value)
          this.start_date = moment(new Date(this.data.start_date)).format('YYYY-MM-DD')
          this.end_date = moment(new Date(this.data.end_date)).format('YYYY-MM-DD')
        }
      })
    },
    retrieveType(){
      let parameter = {
        condition: [
          {
            column: 'payload',
            clause: '=',
            value: 'room_type'
          }
        ]
      }
      this.APIRequest('payloads/retrieve', parameter, response => {
        if(response.data.length > 0){
          this.types = response.data
          // if(this.$route.params.parentRoute !== undefined && this.$route.params.parentRoute !== 'general_limit') {
          //   this.routeParams = response.data[0].id
          // }
        }
      })
    },
    getSelectedType(event){
      console.log('==', event.target.value)
      this.type = event.target.value
      this.routeParams = event.target.value
    },
    create(){
      if(this.end_date < this.start_date){
        this.errorMessage = 'Invalid date range'
        return
      }
      if(this.limit <= 0){
        this.errorMessage = 'Number of rooms must no be less that or equal to zero'
        return
      }
      // if(this.limitPerday <= 0){
      //   this.errorMessage = 'Limit of reservation per day must no be less than or equal to zero'
      //   return
      // }
      // if(this.limitPerday > this.limit){
      //   this.errorMessage = 'Limit of reservation per day must not be greater that number of rooms'
      //   return
      // }
      let parameter = {
        payload: 'room_type',
        payload_value: this.routeParams,
        limit: this.limit,
        // limitPerDay: this.limitPerday,
        start_date: this.start_date,
        end_date: this.end_date,
        status: 'available'
      }
      console.log('------------', parameter)
      if(Object.values(parameter).includes('') || Object.values(parameter).includes(null)){
        this.errorMessage = 'Field should not be empty'
        return
      }
      $('#loading').css({'display': 'block'})
      let route = null
      if(this.data !== null){
        route = 'availabilities/update'
        parameter['id'] = this.$route.params.parentRoute === 'general-limit' ? parseInt(this.$route.params.id) : this.data.id
      }else{
        route = 'availabilities/create'
      }
      console.log('-----------', parameter)
      this.APIRequest(route, parameter, response => {
        $('#loading').css({'display': 'none'})
        if(response.error !== null && response.error.length > 0){
          this.errorMessage = response.error
        }else{
          this.errorMessage = null
          this.$router.push(`/${this.$route.params.parentRoute}`)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
    .actionBtn{
        color: $secondary
    }
    .actionBtn:hover, .backBtn:hover{
        cursor: pointer;
    }
    .form-control-custom{
        width: 300px !important;
        height: 60px !important;
    }
    label{
        font-weight: bold;
    }
</style>
