<template>
    <div style="margin: 56px">
      <span>
          <span @click="$router.push('/add-rooms/' + $route.params.id)" class="backBtn">
              <i class="fas fa-chevron-left"></i>
              Back
          </span>
      </span>
      <span style="float:right">
          <span>
              <b class="actionBtn" @click="update()">Save</b>
          </span>
      </span>
      <section class="mt-5">
        <div style="padding-left:2%; padding-right:2%;">
          <div class="row cards">
              <div class="col-md-10 column">
                  <p>
                  <b>Availability</b><br>
                  By switching on, you allow the availability of this room
                  </p>
              </div>
              <div class="col-md-2 column">
                  <div @click="isSwitch = false" v-if="isSwitch === true">
                    <i class="fas fa-toggle-on"></i>
                  </div>
                  <div @click="isSwitch = true" v-else>
                    <i class="fas fa-toggle-off"></i>
                  </div>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
                <label>Start Date</label>
                <div class="input-group">
                    <date-picker 
                      v-model="start_date" 
                      :type="'date'" 
                      :disabled-date="disablePreviousDates"
                      :format="'MMM D, YYYY'"
                      :value-type="'YYYY-MM-DD'"
                      style="width: 500px"></date-picker>
                </div>
            </div>
            <div class="col-md-6">
                <label>End Date</label>
                <div class="input-group">
                    <date-picker 
                      v-model="end_date" 
                      :type="'date'" 
                      :disabled-date="afterPreviousDate"
                      :format="'MMM D, YYYY'"
                      :value-type="'YYYY-MM-DD'"
                      style="width: 500px"></date-picker>
                </div>
            </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <label>Description</label>
            <div class="input-group">
                <textarea v-model="description" class="form-control-custom form-control" style="height: 165px !important;"></textarea>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  mounted(){
    if(this.$route.params.status === 'publish'){
      this.isSwitch = true
    }else{
      this.isSwitch = false
    }
    this.retrieveById()
    this.retrieveTypeByCode()
  },
  data(){
    return {
      isSwitch: false,
      description: null,
      start_date: null,
      end_date: null,
      data: null,
      category: null,
      type: null
    }
  },
  components: {
    DatePicker
  },
  methods: {
    retrieveStartandEnd(){
      let parameter = {
        id: this.category
      }
      this.APIRequest('availabilities/retrieve_by_code', parameter).then(response => {
        this.type = response.data[0]
      })
    },
    afterPreviousDate(date){
      if(this.type.end_date === null){
        return null
      }
      return date >= new Date(this.type.end_date) || date < new Date(this.start_date)
    },
    disablePreviousDates(date) {
      if(this.type.start_date === null){
        return null
      }
      return date < new Date(this.type.start_date) || date >= new Date(this.type.end_date)
    },
    retrieveTypeByCode(){
      let parameter = {
        code: this.$route.params.id
      }
      this.APIRequest('rooms/retrieve_type_by_code', parameter).then(response => {
        this.category = response.data[0].category
        this.retrieveStartandEnd()
      })
    },
    retrieveById(){
      let parameter = {
        room_code: this.$route.params.id
      }
      this.APIRequest('availabilities/retrieve_by_id', parameter).then(response => {
        if(response.data.length > 0){
          this.data = response.data[0]
          this.description = response.data[0].description
          this.start_date = moment(new Date(response.data[0].start_date)).format('YYYY-MM-DD')
          this.end_date = moment(new Date(response.data[0].end_date)).format('YYYY-MM-DD')
        }
      })
    },
    update(){
      let parameter = {
        id: this.data.id,
        payload: 'room_id',
        payload_value: this.data.payload_value,
        start_date: this.start_date,
        end_date: this.end_date,
        limit: this.type.limit,
        description: this.description,
        status: this.isSwitch === true ? 'available' : 'not_available'
      }
      this.APIRequest('availabilities/update', parameter).then(response => {
        if(response.data > 0){
          this.$router.push('/add-rooms/' + this.$route.params.id)
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
    .cards{
    height: 100px;
    background-color: white;
    margin-bottom: 3%;
  }
  .cards:hover{
    cursor: pointer;
    background: rgba(0,0,0, 0.1)
  }
  .column{
    margin: auto;
    padding: 20px;
  }
  .column i{
    float: right;
    color: '#C84848';
    font-size: 30px
  }
</style>
