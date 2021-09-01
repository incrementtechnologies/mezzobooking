<template>
  <div style="margin:56px">
      <div style="width: 70%; padding: 30px; margin-left:auto; margin-right:auto;">
          <span>
              <span @click="$router.push('/coupons')" class="backBtn">
                  <i class="fa fa-chevron-left"></i>
                  Back
              </span>
          </span>
          <span style="float:right">
              <span>
                  <b class="mr-5 actionBtn">Go to Bookings</b>
                  <b class="actionBtn" @click="create()">Save</b>
              </span>
          </span>
          <span style="float:right">
              <span>
                  <b class="mr-5 actionBtn">Set Schedules & Limits</b>
              </span>
          </span>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Title</label>
                <div class="input-group">
                    <input v-model="title" type="text" class="form-control-custom form-control">
                </div>
            </div>
            <div class="col-md-6">
                <label>Room Type</label>
                <div class="input-group">
                    <select v-model="room_type" type="text" class="form-control-custom form-control">
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <label>Description</label>
            <textarea 
            :class="description == '' ? 'form-control mb-0' : 'form-control'" 
            placeholder="Add description here" 
            rows="10" 
            :style="{
              ...description == '' ? {border: '1px solid red !important'} : '',
            }"
            v-model="description"
          >
          </textarea>
            <!-- <div class="input-group">
                <input v-model="description" rows="10" type="text" class="form-control-custom form-control">
            </div> -->
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Limit Customers</label>
                <div class="input-group">
                    <input v-model="title" type="number" class="form-control-custom form-control">
                </div>
            </div>
            <div class="col-md-6">
                <label>Limit per customer</label>
                <div class="input-group">
                    <input v-model="room_type"  type="number" class="form-control-custom form-control">
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Type</label>
                <div class="input-group">
                    <input v-model="value"  type="number" class="form-control-custom form-control">
                    <select v-model="type" class="form-control" style="width:102px; height:60px">
                        <option value="PHP">PHP</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Status</label>
                <div class="input-group">
                    <select v-model="status" type="text" class="form-control-custom form-control">
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <button class="btn btn-danger footerBtn">Delete</button>
        </div>
      </div>
  </div>
</template>

<script>
import AUTH from 'src/services/auth'
export default {
  data(){
    return {
      data: null,
      user: AUTH.user,
      code: null,
      description: null,
      start_date: null,
      end_date: null,
      title: null,
      room_type: null,
      type: null,
      value: null,
      status: null,
      errorMessage: null
    }
  },
  mounted(){
    if(this.$route.params.code !== undefined){
      this.retrieveByCode()
    }
  },
  methods: {
    create(){
      if(this.code === null || this.description === null || this.start_date === null || this.end_date === null ||
      this.title === null || this.room_type === null || this.type === null || this.value === null || this.status === null
      ){
        this.errorMessage = 'All fields are required'
        return
      }else if(this.value <= 0 || this.title <= 0 || this.room_type <= 0){
        this.errorMessage = 'Value should be greater than 0'
        return
      }
      let parameter = {
        account_id: this.user.userID,
        code: this.code,
        description: this.description,
        start_date: this.start_date,
        end_date: this.end_date,
        title: this.title,
        room_type: this.room_type,
        type: this.type,
        value: this.value,
        status: this.status
      }
      if(this.data !== null){
        parameter['id'] = this.data.id
        this.APIRequest('coupons/update', parameter).then(response => {
          if(response.data !== null){
            this.$router.push('/coupons')
          }
        })
      }else{
        this.APIRequest('coupons/create', parameter).then(response => {
          if(response.data !== null){
            this.$router.push('/coupons')
          }
        })
      }
    },
    retrieveByCode(){
      let couponCode = this.$route.params.code
      let parameters = {
        condition: [{
          column: 'code', value: couponCode, clause: '='
        }],
        account_id: this.user.userID
      }
      this.APIRequest('coupons/retrieve_coupon', parameters).then(response => {
        console.log('============', response)
        if(response.data.length > 0){
          this.data = response.data[0]
          this.code = this.data.code
          this.description = this.data.description
          this.start_date = this.data.start_date
          this.end_date = this.data.end_date
          this.title = this.data.title
          this.room_type = this.data.room_type
          this.type = this.data.type
          this.value = this.data.value
          this.status = this.data.status
        }else{
          this.data = null
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
    .footerBtn{
        width: 150px;
        height: 50px
	}
</style>
