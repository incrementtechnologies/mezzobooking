<template>
  <div style="margin: 56px;">
    <div style="float:left">
    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
    /></div>
    <button class="btn btn-primary pull-right" @click="$router.push('/add-rooms')">Add Room</button>
    <filter-product v-bind:category="category"
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      :grid="['list']">
    </filter-product>
    <div v-if="data !== null && data.length > 0" v-for="(item, index) in data" :key="index">
      <RoomCard :list="item" :actionBtn="true" @isUpdate="isEdit($event)"></RoomCard>
    </div>
    <empty v-if="data === null || data.length === 0" :title="'Empty Rooms!'" :action="'No activity at the moment.'"></empty>
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
import RoomCard from 'src/modules/generic/RoomCard.vue'
import COMMON from 'src/common.js'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
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
          title: 'Room Ascending',
          payload: 'title',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Room Descending',
          payload: 'title',
          payload_value: 'desc',
          type: 'text'
        }, {
          title: 'Description Ascending',
          payload: 'description',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Description Ascending',
          payload: 'description',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Maximum Capacity Ascending',
          payload: 'max_capacity',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Maximum Capacity Descending',
          payload: 'max_capacity',
          payload_value: 'desc',
          type: 'text'
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
    Pager,
    RoomCard
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
        sort: this.currentSort
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('rooms/retrieve', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data.length > 0){
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
          this.data = response.data
          // this.retrievePrice()
        }else{
          this.numPages = null
          this.data = []
        }
      })
    },
    isEdit(event){
      console.log('[event]', event)
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
      this.$router.push('/booking-details')
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
    margin-bottom: 25px;
    height: 40px !important;
  }
</style>
