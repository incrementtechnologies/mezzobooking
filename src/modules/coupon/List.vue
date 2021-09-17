<template>
  <div style="margin: 56px;">
    <div style="float:left">
    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
    /></div>
    <button class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="$router.push('/add-coupons')">Add Coupon</button>
    <filter-product v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      :grid="['list']">
    </filter-product>
    <table v-if="data !== null && data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data">
        <tr v-for="(item, index) in data" :key="index" class="table-row">
          <td>
            <b><span style="font-size: 14px">{{item.code}}</span></b><br/>
            <span style="font-size: 12px">10% OFF</span>
          </td>
          <td style="width: 200px">
            <div style="text-align:center"><b>Start Date</b> <br/>{{item.start_date}}</div>
          </td>
          <td style="width: 200px">
            <div style="text-align:center"><b>End Date</b> <br/>{{item.end_date}}</div>
          </td>
          <td style="width: 200px">
            <div style="text-align:center"><b>Limit</b> <br/>{{item.limit}}</div>
          </td>
          <td style="padding-left: 0; padding-right: 0; width: 200px">
            <div class="row">
              <div class="col-sm-6">
                <div style="text-align:center;horizontal-alignment:center; color:#CBAB58">
                  <span>Revenue</span>
                  <p style="font-size:16px;font-weight:bold;">PHP {{item.value}}</p>
                </div>
              </div>
              <div class="col-md-4" style="width: 300px">
                <i class="fa fa-pencil text-primary" @click="$router.push('/add-coupons/'+ item.code)"></i>
                <i class="fa fa-trash text-danger"></i>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button v-if="data.length > 0" class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="retrieve(currentSort, currentFilter, true)">See More</button> -->
    <empty v-if="data === null || data.length === 0" :title="'Empty Bookings!'" :action="'No activity at the moment.'"></empty>
    <!-- <confirmation
    :title="'Confirmation Modal'"
    :message="'Are you sure you want to delete ?'"
    ref="confirms"
    @onConfirm="remove()"
    >
    </confirmation> -->
    <show-booking ref="booking"/>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import moment from 'moment'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
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
          title: 'Code Ascending',
          payload: 'code',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Code Descending',
          payload: 'code',
          payload_value: 'desc',
          type: 'text'
        }, {
          title: 'Start-Date Ascending',
          payload: 'start_date',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'Start-Date Ascending',
          payload: 'start_date',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'End-Date Ascending',
          payload: 'end_date',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'End-Date Descending',
          payload: 'end_date',
          payload_value: 'desc',
          type: 'date'
        }, {
          title: 'Limit Ascending',
          payload: 'limit',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Limit Descending',
          payload: 'limit',
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
      activePage: 1
    }
  },
  components: {
    'filter-product': require('components/increment/ecommerce/filter/RoundedFilter.vue'),
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'confirmation': require('components/increment/generic/modal/Confirmation.vue'),
    'show-booking': require('modules/booking/ReserveeInformation.vue'),
    Pager
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
        }],
        limit: flag ? this.limit : this.offset + this.limit,
        offset: flag ? this.offset : 0,
        account_id: this.user.userID,
        sort: sort
      }
      $('#loading').css({'display': 'block'})
      console.log(flag)
      this.APIRequest('coupons/retrieve', parameter).then(response => {
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
    update(){
      let parameter = {
        id: this.editId,
        status: this.status
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('reservations/update', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data !== null){
          $('#editBooking').modal('hide')
          this.APIRequest('mezzo/update', {id: this.synqt, status: this.status}).then(response => {
            console.log(response)
          })
          this.retrieve(this.currentSort, this.currentFilter, false)
        }
      })
    },
    remove(){
      let parameter = {
        id: this.id
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('reservations/delete', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data !== null){
          this.retrieve(this.currentSort, this.currentFilter, false)
        }
      })
    }
  }
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
</script>
<style lang="scss" scoped>
  .table{
    border-collapse:separate !important;
    border-spacing:0 15px !important;
    border: none;
  }
  .btn{
    width: 200px;
    height: 50px
  }
  .table-row{
    background-color:white;
  }
  .table-row:hover{
    cursor: pointer;
    background: rgba(0,0,0, 0.1)
  }
  .table-row:active{
    background-color: white;
  }
</style>

