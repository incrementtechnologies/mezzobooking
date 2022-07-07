<template>
  <div style="margin:56px">
    <div>
        <span>
            <span @click="$route.params.code === 'sales' ? $router.push('/general-sales') : $router.push('/coupons')" class="backBtn">
                <i class="fas fa-chevron-left"></i>
                Back
            </span>
        </span>
        <span style="float:right">
            <span>
                <b class="mr-5 actionBtn" @click="($route.params.code !== 'sales' && this.$route.params.code !== undefined) ? $router.push('/revenue/'+code + '/' + data.id) : $router.push('/bookings')">Go to revenue</b>
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
                  <date-picker 
                    v-model="start_date" 
                    :type="'date'" 
                    :disabled-date="disablePreviousDates"
                    :format="'MMM D, YYYY'"
                    :value-type="'YYYY-MM-DD'"
                    style="width: 500px"></date-picker>
                  <!-- <input v-model="start_date" type="datetime-local" class="form-control-custom form-control"> -->
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
      <div class="row mt-4">
          <div class="col-md-6">
              <label>Limit Customers</label>
              <div class="input-group">
                  <input v-model="limit" type="number" min="1"  @input="event => limit = Math.abs(event.target.value)" class="form-control-custom form-control">
              </div>
          </div>
          <div class="col-md-6">
              <label>Limit per customer</label>
              <div class="input-group">
                  <input v-model="limit_per_customer" @input="event => limit_per_customer = Math.abs(event.target.value)" type="number" min="1" class="form-control-custom form-control">
              </div>
          </div>
      </div>
      <div class="row mt-4">
          <div class="col-md-6">
              <label>Amount</label>
              <div class="input-group">
                  <input v-model="amount" type="number" min="1" @input="event => amount = Math.abs(event.target.value)" class="form-control-custom form-control">
                  <!-- <select v-model="currency" class="form-control" style="width:102px; height:40px">
                      <option value="PHP">PHP</option>
                  </select> -->
              </div>
          </div>
          <div class="col-md-6">
              <label>Target</label>
              <searchField
              :test="'target'"
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
              @onSelectTarget="onSelect"
              ref="searchField"
            />
          </div>
      </div>
      <div class="row mt-4">
          <div class="col-md-6">
              <label>Status</label>
              <div class="input-group">
                  <select v-model="status" type="text" class="form-control-custom form-control">
                      <option value="draft">Draft</option>
                      <option value="publish">Publish</option>
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
          <button class="btn btn-danger footerBtn" @click="confirmRemove">Delete</button>
      </div>
    </div>
    <confirmation
      :title="'Confirmation Modal'"
      :message="'Are you sure you want to delete ?'"
      ref="confirms"
      @onConfirm="remove"
    />
  </div>
</template>

<script>
import AUTH from 'src/services/auth'
import searchField from 'src/modules/generic/searchField.vue'
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
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
    'confirmation': require('components/increment/generic/modal/Confirmation.vue'),
    searchField,
    DatePicker
  },
  mounted(){
    console.log(this.$route.params.code !== 'sales', this.$route.hash)
    if(this.$route.params.code !== 'sales' && this.$route.hash !== ''){
      this.retrieveByCode()
    }
    this.retrieveRoomTypes()
  },
  methods: {
    create(){
      var moment = require('moment')
      if(this.code === null || this.description === null || this.start_date === null || this.end_date === null ||
      this.limit === null || this.type === null || this.limit_per_customer === null || this.amount === null || this.status === null
      ){
        this.errorMessage = 'All fields are required'
        return
      }else if(this.value <= 0 || this.limit <= 0 || this.limit_per_customer <= 0){
        this.errorMessage = 'Value should be greater than 0'
        return
      }
      if(moment(this.start_date).isValid() === false || moment(this.end_date).isValid() === false){
        this.errorMessage = 'Invalid date format'
        return
      }
      if(this.end_date < this.start_date){
        this.errorMessage = 'Invalid start-date or end-date'
        return
      }
      let parameter = {
        account_id: this.user.userID,
        code: this.code,
        description: this.description,
        start_date: moment(this.start_date).format('YYYY-MM-DD'),
        end_date: moment(this.end_date).format('YYYY-MM-DD'),
        limit: this.limit,
        limit_per_customer: this.limit_per_customer,
        currency: 'PHP',
        amount: this.amount,
        status: this.status,
        type: this.type,
        selectedType: JSON.stringify(this.selectedTypes)
      }
      parameter.end_date = parameter.end_date + ' ' + '12:00:00'
      if(this.data !== null){
        parameter['id'] = this.data.id
        this.APIRequest('room_coupon/update', parameter).then(response => {
          if(response.data !== null){
            this.$router.push('/coupons')
          }
        })
      }else{
        this.APIRequest('room_coupon/create', parameter).then(response => {
          if(response.data !== null){
            this.$router.push('/coupons')
          }
        })
      }
    },
    retrieveByCode(){
      let couponCode = this.$route.hash
      let parameters = {
        condition: [{
          column: 'code', value: couponCode, clause: '='
        }],
        account_id: this.user.userID
      }
      this.APIRequest('room_coupon/retrieve_coupon', parameters).then(response => {
        if(response.data !== null){
          this.data = response.data
          this.code = this.data.code
          this.description = this.data.description
          this.start_date = moment(this.data.start_date).format('yyyy-MM-DDThh:mm')
          this.end_date = moment(this.data.end_date).format('yyyy-MM-DDThh:mm')
          this.limit = this.data.limit
          this.limit_per_customer = this.data.limit_per_customer
          this.type = this.data.type
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
          this.$refs.searchField.targets = Object.values(this.data.target)
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
    confirmRemove(){
      this.$refs.confirms.show(this.data.id)
    },
    remove(data){
      let parameter = {
        id: data.id
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('room_coupon/delete', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        this.$router.push('/coupons')
      })
    },
    onSelect(data){
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
    },
    afterPreviousDate(date){
      if(this.start_date === null){
        return null
      }
      var d = new Date(this.start_date)
      return date < new Date(d.setDate(d.getDate() - 1))
    },
    disablePreviousDates(date) {
      var d = new Date()
      return date <= new Date(d.setDate(d.getDate() - 1))
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
