<template>
  <div style="margin: 56px;">
    <filter-product v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      :grid="['list']">
    </filter-product>
    <button class="btn btn-primary pull-right" @click.prevent="$router.push('/add-coupons')">Add Coupon</button>
    <table v-if="data !== null && data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data">
        <tr v-for="(item, index) in data" :key="index" class="table-row">
          <td style="width: 200px">
            <div style="text-align:center">
              <b><span style="font-size: 12px">{{item.code}}</span></b><br/>
              <span style="font-size: 12px">{{item.description}}</span>
            </div>
          </td>
          <td style="width: 200px">
            <div style="text-align:center"><b style="font-size: 12px">Start Date</b> <br/><span style="font-size:11px">{{item.start_date}}</span></div>
          </td>
          <td style="width: 200px">
            <div style="text-align:center;"><b style="font-size: 12px">End Date</b> <br/><span style="font-size:11px">{{item.end_date}}</span></div>
          </td>
          <td style="width: 200px">
            <div style="text-align:center"><b style="font-size: 12px">Limit</b> <br/><span style="font-size:11px">{{item.limit}}</span></div>
          </td>
          <td style="padding-left: 0; padding-right: 0; width: 200px">
            <div class="row">
              <div class="col-sm-7">
                <div style="text-align:center;horizontal-alignment:center; color:#CBAB58">
                  <span>Revenue</span>
                  <p style="font-size:16px;font-weight:bold;" v-if="item.type === 'fixed'">PHP {{$format.format(item.amount)}}</p>
                  <p style="font-size:16px;font-weight:bold;" v-else>{{$format.format(item.amount)}}%</p>
                </div>
              </div>
              <div class="col-md-4 d-flex" style="width: 270px;">
                <div @click="navigate(item.code)">
                  <i class="fas fa-pencil-alt" style="color:#003"></i>
                </div>
                <div @click.prevent="confirmRemove(item.id)">
                  <i class="fas fa-trash text-danger"></i>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="float:right">
    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
    /></div>
    <!-- <button v-if="data.length > 0" class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="retrieve(currentSort, currentFilter, true)">See More</button> -->
    <empty v-if="data === null || data.length === 0" :title="'Empty Coupons!'" :action="'No activity at the moment.'"></empty>
    <confirmation
      :title="'Confirmation Modal'"
      :message="'Are you sure you want to delete ?'"
      ref="confirms"
      @onConfirm="deleteCoupon"
    >
    </confirmation>
    <show-booking ref="booking"/>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import moment from 'moment'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import ROUTER from 'src/router'
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
          title: 'Start-Date Descending',
          payload: 'start_date',
          payload_value: 'desc',
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
    retrieve(sort, filter, flag){
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
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage,
        account_id: this.user.userID,
        sort: sort !== null ? sort : this.currentSort
      }
      $('#loading').css({'display': 'block'})
      console.log(flag)
      this.APIRequest('room_coupon/retrieve', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data.length > 0){
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
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
        }else{
          this.data = []
          this.numPages = null
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
        }
        this.retrieve(this.currentSort, this.currentFilter, false)
      })
    },
    confirmRemove(id){
      console.log('=========', id)
      this.$refs.confirms.show(id)
    },
    deleteCoupon(data){
      $('#loading').css({'display': 'block'})
      this.APIRequest('room_coupon/delete', {id: data.id}, response => {
        $('#loading').css({'display': 'none'})
        this.retrieve(this.currentSort, this.currentFilter, false)
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
    },
    navigate(code){
      console.log('<><><<>>', code)
      ROUTER.push('/add-coupons/' + code)
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
  .btn-primary{
    height: 40px !important;
  }
</style>

