<template>
  <div style="margin:56px">
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
    <button class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="$router.push('/add-room-types')">Add New</button>
    <table class="table table-responsive">
      <div v-for="(room, idx) in data" :key="idx">
        <RoomTypeCard :data="room"/>
      </div>
    </table>
  </div>
</template>

<script>
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import RoomTypeCard from 'src/modules/generic/RoomTypeCard.vue'
import AUTH from 'src/services/auth'
export default {
  components: {
    'filter-product': require('components/increment/ecommerce/filter/RoundedFilter.vue'),
    Pager,
    RoomTypeCard
  },
  mounted(){
    this.retrieve({'created_at': 'asc'}, {column: 'created_at', value: ''}, false)
  },
  data(){
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
          title: 'Created_at Ascending',
          payload: 'created_at',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'Created_at Descending',
          payload: 'created_at',
          payload_value: 'desc',
          type: 'date'
        }, {
          title: 'Type Ascending',
          payload: 'category',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Type Descending',
          payload: 'category',
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
        sort: sort
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('payloads/retrieve_room_types', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data.length > 0){
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
          this.data = response.data
        }else{
          this.data = []
          this.numPages = null
        }
      })
    }
  }
}
</script>

<style>

</style>
