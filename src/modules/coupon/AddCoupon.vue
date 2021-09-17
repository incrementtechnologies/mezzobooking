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
                  <b class="mr-5 actionBtn">Go to revenue</b>
                  <b class="actionBtn" @click="create()">Save</b>
              </span>
          </span>
        <div class="mt-5">
            <p  class="text-danger">{{errorMessage}}</p>
            <label>Coupon Code</label>
            <div class="input-group">
                <input v-model="code" type="text" class="form-control-custom form-control">
            </div>
        </div>
        <div class="mt-4">
            <label>Description</label>
            <div class="input-group">
                <input v-model="description"  type="text" class="form-control-custom form-control">
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Start Date</label>
                <div class="input-group">
                    <input v-model="start_date" type="datetime-local" class="form-control-custom form-control">
                </div>
            </div>
            <div class="col-md-6">
                <label>End Date</label>
                <div class="input-group">
                    <input v-model="end_date"  type="datetime-local" class="form-control-custom form-control">
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Limit Customers</label>
                <div class="input-group">
                    <input v-model="limit" type="number" class="form-control-custom form-control">
                </div>
            </div>
            <div class="col-md-6">
                <label>Limit per customer</label>
                <div class="input-group">
                    <input v-model="limit_per_customer"  type="number" class="form-control-custom form-control">
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Type</label>
                <div class="input-group">
                    <input v-model="amount"  type="number" class="form-control-custom form-control">
                    <select v-model="currency" class="form-control" style="width:102px; height:60px">
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
      limit: null,
      limit_per_customer: null,
      currency: null,
      amount: null,
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
      this.limit === null || this.limit_per_customer === null || this.currency === null || this.amount === null || this.status === null
      ){
        this.errorMessage = 'All fields are required'
        return
      }else if(this.value <= 0 || this.limit <= 0 || this.limit_per_customer <= 0){
        this.errorMessage = 'Value should be greater than 0'
        return
      }
      let parameter = {
        account_id: this.user.userID,
        code: this.code,
        description: this.description,
        start_date: this.start_date,
        end_date: this.end_date,
        limit: this.limit,
        limit_per_customer: this.limit_per_customer,
        currency: this.currency,
        amount: this.amount,
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
          this.limit = this.data.limit
          this.limit_per_customer = this.data.limit_per_customer
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
