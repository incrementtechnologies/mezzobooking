<template>
  <div style="margin: 56px;">
    <p>
      <span class="backAction" @click="$router.push('/room-types')"><i class="fas fa-chevron-left"></i>&nbsp;Back / {{$route.params.code}}</span>
    </p>
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
    <button v-if="data.length > 0" class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="exportData()">Export to CSV</button>
    <table v-if="data !== null && data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data">
        <tr v-for="(item, index) in data" :key="index" class="table-row" @click="redirect(item.code)">
          <td>
            <b><span style="font-size: 14px">{{item.email}}-{{item.status}}</span></b><br/>
            <span style="font-size: 12px">{{item.check_in}}-{{item.check_out}}</span>
          </td>
          <td>
            <div style="text-align:center"><b>Adults</b> <br/>{{item.details.adults}}</div>
          </td>
          <td>
            <div style="text-align:center"><b>Children</b> <br/>{{item.details.child}}</div>
          </td>
          <td style="padding: 20px 0;">
            <div style="text-align:center;horizontal-alignment:center;font-size:16px;font-weight:bold; color:#CBAB58">PHP {{item.price}}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button v-if="data.length > 0" class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="retrieve(currentSort, currentFilter, true)">See More</button> -->
    <empty v-if="data === null || data.length === 0" :title="'Empty Bookings!'" :action="'No activity at the moment.'"></empty>
    <confirmation
    :title="'Confirmation Modal'"
    :message="'Are you sure you want to delete ?'"
    ref="confirms"
    >
    </confirmation>
    <show-booking ref="booking"/>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import moment from 'moment'
import COMMON from 'src/common.js'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import { ExportToCsv } from 'export-to-csv'
export default {
  mounted() {
    this.retrieve({'created_at': 'asc'}, {column: 'created_at', value: ''}, false)
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
          title: 'Created Ascending',
          payload: 'created_at',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'Created Descending',
          payload: 'created_at',
          payload_value: 'desc',
          type: 'date'
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
      console.log('=========', this.currentSort, sort)
      let parameter = {
        condition: [{
          value: this.currentFilter.value ? '%' + this.currentFilter.value + '%' : '%%',
          column: this.currentFilter.column,
          clause: 'like'
        }],
        limit: flag ? this.limit : this.offset + this.limit,
        offset: flag ? this.offset : 0,
        sort: sort !== null ? sort : this.currentSort
      }
      if(this.$route.params.category !== undefined){
        parameter.condition.push({
          value: this.$route.params.id,
          column: 'reservation_id',
          clause: '='
        })
      }
      $('#loading').css({'display': 'block'})
      console.log(flag)
      this.APIRequest('reservations/retrieve_bookings', parameter).then(response => {
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
    },
    redirect(data){
      this.$router.push('/booking-details/' + data)
    },
    exportData(){
      let options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Trackr',
        useTextFile: false,
        useBom: true,
        // useKeysAsHeaders: true,
        filename: COMMON.APP_NAME,
        headers: ['Name', 'Check_in', 'Check_out', 'No. of adults', 'No. of children', 'status', 'Amount']
      }
      var exportData = []
      if(this.data.length > 0){
        for (let index = 0; index < this.data.length; index++) {
          const item = this.data[index]
          let obj = {
            name: item.email,
            check_in: item.check_in,
            check_out: item.check_out,
            no_of_adults: item.details.adults,
            no_of_children: item.details.children,
            status: item.status,
            amount: item.price
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
  .backAction{
    font-size: 15px;
    cursor: pointer;
  }
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
