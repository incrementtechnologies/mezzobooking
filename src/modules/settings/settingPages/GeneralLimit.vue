<template>
  <div style="margin: 56px;">
    <filter-product v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      :grid="['list']">
    </filter-product>
     <div style="float:right">
      <button class="btn btn-secondary pull-right ml-5" style="height: 40px !important;" @click="$router.push('/add-limits/general-limit')">Add Limits</button>
      <button v-if="data.length > 0" class="btn btn-primary pull-right" style="height: 40px !important;" @click="exportData()">Export to CSV</button>
    </div>
    <table v-if="data !== null && data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data">
        <tr v-for="(item, index) in data" :key="index" class="table-row" @click="redirect(item.id)">
          <td>
            <div class="row" style="margin-left: 2%;padding-right: 2%">
              <div class="col-md-12" style="padding: 20px 0px">
                <span style="font-size: 12px" v-if="item.start_date !== null">{{item.start_date}} - {{item.end_date}}</span>
                <span style="font-size: 12px" v-else>Available all the time</span><br/>
                <span style="font-size: 24px; font-weight: bold">{{item.remaining_qty}} available reservation(s) left for today</span><br/>
                <span style="font-size: 12px">{{item.payload_value}}</span>
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
    <empty v-if="data === null || data.length === 0" :title="'Empty General Limits!'" :action="'No activity at the moment.'"></empty>
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
    this.retrieve({'limit': 'asc'}, {column: 'limit', value: ''}, false)
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
          title: 'Limit Ascending',
          payload: 'limit',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Limit Descending',
          payload: 'limit',
          payload_value: 'desc',
          type: 'text'
        }, {
          title: 'Start Date Ascending',
          payload: 'start_date',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'Start Date Descending',
          payload: 'start_date',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'End Date Ascending',
          payload: 'end_date',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'End Date Descending',
          payload: 'end_date',
          payload_value: 'desc',
          type: 'date'
        }, {
          title: 'Room Type Ascending',
          payload: 'payload_value',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Room Type Descending',
          payload: 'payload_value',
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
        sort: sort != null ? sort : this.currentSort
      }
      $('#loading').css({'display': 'block'})
      console.log(flag)
      this.APIRequest('availabilities/retrieve', parameter).then(response => {
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
    redirect(id){
      this.$router.push('/add-limits/general-limit/' + id)
    },
    exportData(){
      let options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Limit',
        useTextFile: false,
        useBom: true,
        // useKeysAsHeaders: true,
        filename: COMMON.APP_NAME,
        headers: ['Room Type', 'Limit', 'Start Date', 'End Date']
      }
      var exportData = []
      if(this.data.length > 0){
        for (let index = 0; index < this.data.length; index++) {
          const item = this.data[index]
          let obj = {
            room_type: item.payload_value,
            limit: item.limit,
            start_date: item.start_date !== null ? item.start_date : 'N/A',
            end_date: item.end_date !== null ? item.end_date : 'N/A'
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
  .table-row:hover{
    background: rgba(0,0,0, 0.1);
    cursor: pointer;
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
