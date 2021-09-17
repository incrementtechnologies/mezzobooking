<template>
  <div style="margin: 56px;">
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
      <button class="btn btn-primary pull-right" style="margin-bottom: 25px;"  @click="create()">Add</button>
      <input type="text" v-model="title" class="form-control" placeholder="Type feature here">
    </div>
    <table class="table table-responsive">
    <div class="row" v-for="(feature, idx) in data" :key="idx">
        <div class="col-12 mt-3">
            <div class="card" style="min-height: 106px">
                <div class="card-horizontal">
                    <div class="card-body">
                        <div class="mb-3">
                            <span style="float:right">
                                <i class="fa fa-pencil ml-2 actionBtn" @click="showUpdate(item)"></i>
                                <i class="fa fa-trash ml-2 actionBtn" @click="showDeleteConfirmation(item)"></i>
                            </span>
                            <span><b  style="font-size:24px">{{feature.payload_value}}</b><br>
                                Date Created: {{feature.created_at}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </table>
    <Confirmation
      ref="confirm"
      :message="'Are you sure do you want to delete this feature?'"
      :title="'Confirmation'"
      @onConfirm="e => {
        remove(e)
      }"
    ></Confirmation>
  </div>
</template>

<script>
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import Confirmation from 'src/components/increment/generic/modal/Confirmation.vue'
import AUTH from 'src/services/auth'
import moment from 'moment'
export default {
  mounted(){
    this.retrieve({'payload_value': 'asc'}, {column: 'payload_value', value: ''}, false)
  },
  data(){
    return {
      numPages: null,
      activePage: 1,
      offset: 0,
      limit: 5,
      currentFilter: null,
      currentSort: null,
      user: AUTH.user,
      feature: null,
      category: [{
        title: 'Sort By',
        sorting: [{
          title: 'Title Ascending',
          payload: 'payload_value',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Title Descending',
          payload: 'payload_value',
          payload_value: 'desc',
          type: 'date'
        }, {
          title: 'Created-At Ascending',
          payload: 'create-at',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Created-At Descending',
          payload: 'created_at',
          payload_value: 'desc',
          type: 'text'
        }]
      }],
      title: null,
      data: []
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
    create(){
      let parameter = {
        account_id: this.user.userID,
        payload: 'feature',
        category: null,
        payload_value: this.title,
        status: 'create'
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('payloads/create_with_images', parameter, response => {
        $('#loading').css({'display': 'none'})
        this.retrieve({'payload_value': 'asc'}, {column: 'payload_value', value: ''}, false)
      })
    },
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
        sort: sort,
        payload: 'feature'
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.form-control{
  width: 20%;
  float: right;
  margin-right: 10px;
  height: 40px !important
}
.card-horizontal {
    display: flex;
    flex: 1 1 auto;
    // min-height: 150px;
  }
.actionBtn{
  font-size: 20px;
  cursor: pointer;
}
.fa-pencil{
  color: $primary
}
.fa-trash{
  color: $danger
}
.card-text{
  color: gray
}
</style>
