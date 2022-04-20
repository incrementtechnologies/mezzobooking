<template>
  <div style="margin:56px">
    <filter-product v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      :grid="['list']">
    </filter-product>
    <button class="btn btn-primary pull-right" @click="$router.push('/add-room-types')">Add New</button>
    <table class="table table-responsive">
      <div v-for="(room, idx) in data" :key="idx">
        <RoomTypeCard :data="room"/>
      </div>
    </table>
    <div style="float:right">
    <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
    /></div>
    <empty v-if="data.length === 0" :title="'Empty Customers!'" :action="'No activity at the moment.'"></empty>
    <Confirmation
      :title="'Confirmation Modal'"
      :message="'Are you sure you want to delete ?'"
      ref="confirms"
      @onConfirm="remove"
    ></Confirmation>
    <div class="modal fade" id="errorModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
              <p class="text-danger">{{errorMessage}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import RoomTypeCard from 'src/modules/generic/RoomTypeCard.vue'
import AUTH from 'src/services/auth'
import Confirmation from 'src/components/increment/generic/modal/Confirmation.vue'
export default {
  components: {
    'filter-product': require('components/increment/ecommerce/filter/RoundedFilter.vue'),
    'empty': require('components/increment/generic/empty/Empty.vue'),
    Pager,
    RoomTypeCard,
    Confirmation
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
      activePage: 1,
      errorMessage: null
    }
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
        sort: sort !== null ? sort : this.currentSort,
        payload: 'room_type'
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('payloads/retrieve_with_images', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data.length > 0){
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
          this.data = response.data
        }else{
          this.data = []
          this.numPages = null
        }
      })
    },
    delete(data){
      let parameter = {
        id: data
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('payloads/delete_with_images', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.error !== null){
          this.errorMessage = response.error
          $('#errorModal').modal('show')
        }
        this.retrieve({'created_at': 'asc'}, {column: 'created_at', value: ''}, false)
      })
    },
    deleteConfirmation(id){
      console.log('>>>>>>>>>', id)
      this.$refs.confirms.show(id)
      // this.deleteId = id
    },
    remove(e){
      console.log('remove', e)
      this.delete(e.id)
    }
  }
}
</script>

<style>

</style>
