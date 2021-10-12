<template>
    <div style="margin: 56px">
      <span>
          <span @click="$router.push('/general-limit')" class="backBtn">
              <i class="fa fa-chevron-left"></i>
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
              <select @change="getSelectedType" class="form-control-custom form-control">
                <option v-for="(type, idx) in types" :key="idx" :value="type.id" :selected="$route.params.id !== undefined && parseInt($route.params.id) === parseInt(type.id) ? true : false">{{type.payload_value}}</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <label>Number Limits</label>
            <div class="input-group">
                <input v-model="limit" type="number" class="form-control-custom form-control">
            </div>
          </div>
        </div>
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
export default {
  mounted() {
    this.retrieveType()
    this.type = this.$route.params.id !== undefined ? this.$route.params.id : null
  },
  data: () => ({
    types: [],
    user: AUTH,
    type: null,
    start_date: null,
    end_date: null,
    limit: null,
    errorMessage: null
  }),
  methods: {
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
          this.type = response.data[0].id
        }
      })
    },
    getSelectedType(event){
      console.log('==', event.target.value)
      this.type = event.target.value
    },
    create(){
      let parameter = {
        payload: 'room_type',
        payload_value: this.type,
        limit: this.limit,
        start_date: this.start_date,
        end_date: this.end_date,
        status: 'available'
      }
      if(Object.keys(parameter).includes('') || Object.keys(parameter).includes(null)){
        this.errorMessage = 'Field should not be empty'
        return
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('availabilities/create', parameter, response => {
        $('#loading').css({'display': 'none'})
        this.$router.push('/general-limit')
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
