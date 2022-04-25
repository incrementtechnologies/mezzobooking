<template>
  <div style="margin: 56px;">
    <filter-product v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      :grid="['list']">
    </filter-product>
    <div>
      <button v-if="data.length > 0" class="btn btn-secondary pull-right ml-5"  @click="$router.push('/add-coupons/sales')">Add Sale</button>
      <button v-if="data.length > 0" class="btn btn-primary pull-right" @click="exportData()">Export to CSV</button>
    </div>
    <table v-if="data !== null && data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data">
        <tr v-for="(item, index) in data" :key="index" class="table-row" @click="redirect()">
          <td>
            <div class="row" style="margin-left: 2%;padding-right: 2%">
              <div class="col-md-6" style="padding: 20px 0px">
                <b><span style="font-size: 12px">{{item.start_date}} - {{item.end_date}}</span></b><br/>
                <span style="font-size: 24px; font-weight: bold">{{item.amount}}{{item.type === "percentage" ? '%' : ''}} OFF</span><br/>
                <span style="font-size: 12px">{{item.description}}</span>
              </div>
              <div class="col-md-6 column">
                <div class="box mr-1">
                  <p class="box-title">Total Sales</p>
                  <span><b>PHP {{item.total_sale[0].total !== null ? item.total_sale[0].total : 0}}</b></span>
                </div>
                <div class="box">
                  <p class="box-title">Total Bookings</p>
                  <span><b>{{item.total_sale[0].total_booking}}</b></span>
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
    <empty v-if="data === null || data.length === 0" :title="'Empty General Sales!'" :action="'No activity at the moment.'"></empty>
    <confirmation
    :title="'Confirmation Modal'"
    :message="'Are you sure you want to delete ?'"
    ref="confirms"
    @onConfirm="remove()"
    >
    </confirmation>
    <show-booking ref="booking"/>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import moment from 'moment'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import { ExportToCsv } from 'export-to-csv'
import COMMON from 'src/common.js'
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
          title: 'Amount Ascending',
          payload: 'amount',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Amount Descending',
          payload: 'amount',
          payload_value: 'desc',
          type: 'text'
        }, {
          title: 'Start Date Ascending',
          payload: 'start_date',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'End Date Ascending',
          payload: 'end_date',
          payload_value: 'asc',
          type: 'date'
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
        sort: this.currentSort
      }
      $('#loading').css({'display': 'block'})
      console.log(flag)
      this.APIRequest('room_coupon/retrieve_general_sale', parameter).then(response => {
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
          this.numPages = null
          this.data = []
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
    },
    redirect(){
    },
    exportData(){
      let options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Mezzo',
        useTextFile: false,
        useBom: true,
        // useKeysAsHeaders: true,
        filename: COMMON.APP_NAME,
        headers: ['Customer Id', 'Amount', 'Start Date', 'End Date', 'Total Bookings', 'Total Sales']
      }
      var exportData = []
      if(this.data.length > 0){
        for (let index = 0; index < this.data.length; index++) {
          const item = this.data[index]
          let obj = {
            customer_id: item.id,
            amount: item.amount !== null ? item.amount + (item.type === 'percentage' ? '%' : '') : 'N/A',
            start_date: item.start_date,
            end_date: item.end_date,
            total_booking: item.total_sale[0].total_booking,
            total_sale: item.total_sale[0].total !== null ? item.total_sale[0].total : 0
          }
          exportData.push(obj)
        }
      }
      if(exportData.length > 0){
        var csvExporter = new ExportToCsv(options)
        csvExporter.generateCsv(exportData)
      }
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
  }
  .btn{
    width: 200px;
    height: 50px
  }
  .table-row{
    background-color:white;
  }
  .box{
    // border-color: $gray !important;
    // border-style: solid;
    border: 1px $gray solid;
    padding: 30px 0px;
    width: 30%;
    text-align: center;
  }
  .column div{
    float: right;
    clear: none;
    margin-right: 2%;
  }
  .box-title{
    color: $secondary;
  }
</style>
