<template>
  <div style="margin:56px">
      <div>
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
                <label>Amount</label>
                <div class="input-group">
                    <input v-model="amount" type="number" class="form-control-custom form-control">
                    <!-- <select v-model="currency" class="form-control" style="width:102px; height:40px">
                        <option value="PHP">PHP</option>
                    </select> -->
                </div>
            </div>
            <div class="col-md-6">
                <label>Target</label>
                <searchField
                :test="'payload'"
                :placeholder="'Select Target'"
                :items="roomTypes"
                :isMultiple="isMultiple"
                :styles="{
                  background: 'none',
                  color: '#84868B !important',
                  width: '100% !important',
                  height: '60% !important',
                  borderRadius: '5px !important',
                  border: 'none',
                }"
                :dropdownItemStyles="{
                  borderRadius: '5px',
                  overflow: 'hidden',
                  width: 'calc(100% - 30px)'
                }"
                :class="'multiselect__tags1'"
                :selectedIndex="selectedIndex"
                @onSelect="onSelect"
                ref="searchField"
              />
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
            <div class="col-md-6">
                <label>Type</label>
                <div class="input-group">
                    <select v-model="type" type="text" class="form-control-custom form-control">
                        <option value="percentage">Percentage Discount</option>
                        <option value="fixed">Fixed Discount</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mt-4" v-if="data !== null">
            <button class="btn btn-danger footerBtn" @click="remove">Delete</button>
        </div>
      </div>
  </div>
</template>

<script>
import AUTH from 'src/services/auth'
import searchField from 'src/modules/generic/searchField.vue'
import moment from 'moment'
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
      errorMessage: null,
      roomTypes: [],
      isMultiple: true,
      selectedIndex: null,
      selectedTypes: [],
      type: null
    }
  },
  components: {
    searchField
  },
  mounted(){
    if(this.$route.params.code !== undefined){
      this.retrieveByCode()
    }
    this.retrieveRoomTypes()
  },
  methods: {
    create(){
      if(this.code === null || this.description === null || this.start_date === null || this.end_date === null ||
      this.limit === null || this.type === null || this.limit_per_customer === null || this.currency === null || this.amount === null || this.status === null
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
        status: this.status,
        type: this.type,
        selectedType: JSON.stringify(this.selectedTypes)
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
            // this.$router.push('/coupons')
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
        if(response.data !== null){
          this.data = response.data
          this.code = this.data.code
          this.description = this.data.description
          this.start_date = moment(this.data.start_date).format('yyyy-MM-DDThh:mm')
          this.end_date = moment(this.data.end_date).format('yyyy-MM-DDThh:mm')
          this.limit = this.data.limit
          this.limit_per_customer = this.data.limit_per_customer
          this.currency = this.data.type
          this.amount = this.data.amount
          this.status = this.data.status
          let isAll = this.data.target.filter(el => {
            return el.id === 'All'
          })
          if(isAll.length > 0){
            this.isMultiple = false
          }else{
            this.isMultiple = true
          }
          this.$refs.searchField.value = this.data.target
        }else{
          this.data = null
        }
      })
    },
    retrieveRoomTypes(){
      this.APIRequest('payloads/retrieve_all', {}, response => {
        let defaultdata = {
          id: 'All',
          payload_value: 'All'
        }
        response.data.push(defaultdata)
        this.roomTypes = response.data
      })
    },
    remove(){
      let parameter = {
        id: this.data.id
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('reservations/delete', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        this.$router.push('/coupons')
      })
    },
    onSelect(data){
      console.log('============', data)
      if(Array.isArray(data)){
        let isAll = data.filter(el => {
          return el.id === 'All'
        })
        if(isAll.length > 0){
          this.isMultiple = false
          this.$refs.searchField.value = isAll
          this.selectedTypes = isAll
        }else{
          this.isMultiple = true
          this.selectedTypes = data
        }
      }else{
        if(data.id !== 'All'){
          this.isMultiple = true
        }else{
          this.isMultiple = false
        }
        this.selectedTypes = data
      }
      // console.log('---------', this.$refs.searchField.value)
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
      height: 40px !important;
  }
  label{
      font-weight: bold;
  }
  .footerBtn{
      width: 150px;
      height: 50px
	}
</style>
