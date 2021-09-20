<template>
  <div style="margin: 56px;">
    <div class="mb-5">
      <span>
          <span @click="$router.push('/settings')" class="backBtn">
              <i class="fa fa-chevron-left"></i>
              Back
          </span>
      </span>
      <span style="float:right">
          <span>
              <b class="mr-5 actionBtn btn1">Room Add-ons</b>
              <b class="actionBtn btn2">Checkout Add-ons</b>
          </span>
      </span>
    </div>
    <filter-product v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      :grid="['list']">
    </filter-product>
    <div style="float:left">
    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
    /></div>
    <div>
      <button class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="create()">Add</button>
      <!-- <button class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="$router.push('/add-coupons')">Add</button> -->
      <input type="number" class="form-control" placeholder="Type default price" v-model="price">
      <input type="text" class="form-control addOns" placeholder="Type your add-ons here" v-model="addOns">
    </div>
    <table v-if="data !== null && data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data" style="height:102px;">
        <tr v-for="(item, index) in data" :key="index" class="table-row" @click="redirect()">
          <td style="padding:0px !important">
            <div class="row" style="margin-left: 2%;padding-right: 2%">
              <div class="col-md-6" style="padding: 20px 0px">
                <b><span style="font-size: 12px">Cutomer ID: {{item.id}}</span></b><br/>
                <span style="font-size: 24px; font-weight: bold">{{item.name !== " " ? item.name : item.username}}</span><br/>
                <span style="font-size: 12px">{{item.cellular_number !== null ? item.cellular_number : 'N/A'}} / {{item.email}}</span>
              </div>
              <div class="col-md-6 column">
                <div class="actionBtn ml-2">
                  <i class="fa fa-pencil"></i>
                  <span><i class="fa fa-trash"></i></span>
                </div>
                <div class="box mr-1">
                  <p class="box-title">Default Price</p>
                  <span><b>1,999</b></span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button v-if="data.length > 0" class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="retrieve(currentSort, currentFilter, true)">See More</button> -->
    <empty v-if="data === null || data.length === 0" :title="'Empty Add-Ons!'" :action="'No activity at the moment.'"></empty>
    <Confirmation
      ref="confirm"
      :message="'Are you sure do you want to delete this Add?'"
      :title="'Confirmation'"
      @onConfirm="e => {
        remove(e)
      }"
    ></Confirmation>
    <show-booking ref="booking"/>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import moment from 'moment'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import Confirmation from 'src/components/increment/generic/modal/Confirmation.vue'
export default {
  mounted() {
    this.retrieve({'code': 'asc'}, {column: 'code', value: ''}, false)
  },
  data() {
    return {
      editId: null,
      user: AUTH.user,
      activeSortTitle: null,
      reservee: null,
      datetime: null,
      status: null,
      guest: null,
      data: [],
      category: [{
        title: 'Sort By',
        sorting: [{
          title: 'Email Ascending',
          payload: 'email',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Email Descending',
          payload: 'email',
          payload_value: 'desc',
          type: 'text'
        }, {
          title: 'CheckIn Ascending',
          payload: 'check_in',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'CheckIn Ascending',
          payload: 'check_in',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'CheckOut Ascending',
          payload: 'check_out',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'CheckOut Descending',
          payload: 'check_out',
          payload_value: 'desc',
          type: 'date'
        }, {
          title: 'Status Ascending',
          payload: 'status',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Status Descending',
          payload: 'status',
          payload_value: 'desc',
          type: 'text'
        }]
      }],
      currentFilter: null,
      currentSort: null,
      offset: 0,
      limit: 5,
      id: null,
      synqt: null,
      reservationStatus: false,
      click: false,
      numPages: null,
      activePage: 1,
      addOns: null,
      price: 0,
      errorMessage: null
    }
  },
  components: {
    'filter-product': require('components/increment/ecommerce/filter/RoundedFilter.vue'),
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'confirmation': require('components/increment/generic/modal/Confirmation.vue'),
    'show-booking': require('modules/booking/ReserveeInformation.vue'),
    Pager,
    Confirmation
  },
  methods: {
    retrieve(sort = null, filter = null, flag = null){
      if(flag === true) {
        this.offset += this.limit
      }
      if(filter !== null){
        this.currentFilter = filter
      }
      if(sort !== null){
        this.currentSort = sort
      }
      let parameter = {
        condition: [{
          value: this.currentFilter.value ? '%' + this.currentFilter.value + '%' : '%%',
          column: this.currentFilter.column,
          clause: 'like'
        },
        {
          value: this.user.userID,
          column: 'account_id',
          clause: 'like'
        }],
        limit: flag ? this.limit : this.offset + this.limit,
        offset: flag ? this.offset : 0,
        sort: sort
      }
      $('#loading').css({'display': 'block'})
      console.log(flag)
      this.APIRequest('add-on/retrieve', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(flag === true) {
          response.data.forEach(element => {
            element.date_time_at_human = moment(new Date(element.datetime)).format('MMMM Do YYYY, hh:mm a')
            this.data.push(element)
          })
        } else {
          response.data.forEach(element => {
            element.date_time_at_human = moment(new Date(element.datetime)).format('MMMM Do YYYY, hh:mm a')
          })
          this.data = response.data
        }
      })
    },
    showUpdate(item){
      this.item = item
      this.addOns = item.payload_value
      this.canUpdate = true
    },
    update(){
      let parameter = {
        id: this.editId,
        status: this.status
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('add-on/update', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data !== null){
          this.retrieve(this.currentSort, this.currentFilter, false)
        }
      })
    },
    showDeleteConfirmation(item){
      this.$refs.confirm.show(item.id)
    },
    remove(){
      let parameter = {
        id: this.id
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('add-on/delete', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data !== null){
          this.retrieve(this.currentSort, this.currentFilter, false)
        }
      })
    },
    create(){
      if(this.addOns == null){
        this.errorMessage = 'All fields are required'
        return
      }else if(this.price <= 0){
        this.errorMessage = 'Value should be greater than 0'
        return
      }
      let parameter = {
        account_id: this.user.userID,
        price: this.price,
        addOns: this.addOns
      }
      this.APIRequest('add-on/create', parameter).then(response => {
        if(response.data !== null){
          this.$router.push('/add-ons')
        }
      })
    },
    redirect(){
    }
  }
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
</script>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
  .table{
    border-collapse:separate !important;
    border-spacing:0 15px !important;
    border: none;
    padding: 0;
  }
  .table-row{
    background-color:white;
  }
  .box{
    border: 1px $gray solid;
    padding: 10px;
    width: 40%;
    text-align: center;
    margin-top: 20px;
  }
  .actionBtn{
    text-align: center;
    margin-top: 20px;
  }
  .btn1{
    color: $primary;
  }
  .btn2{
    color: $secondary;
  }
  .fa-pencil, .fa-trash{
    font-size: 20px !important;
    cursor: pointer;
  }
  .fa-pencil{
    color: $primary;
  }
  .fa-trash{
    color: $danger
  }
  .column div{
    float: right;
    clear: none;
    margin-right: 2%;
  }
  .box-title{
    color: $secondary;
  }
  .form-control{
    width: 20%;
    float: right;
    margin-right: 10px;
    height: 40px !important
  }

  .addOns{
    width: 40%;
    float: right;
    margin-right: 10px;
    height: 40px !important
  }
</style>
