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
      <button class="btn btn-primary pull-right" style="margin-bottom: 25px;" v-if="canUpdate === false" @click="create()">Add</button>
      <button class="btn btn-primary pull-right" style="margin-bottom: 25px;" v-else @click="update()">Update</button>
      <input type="text" class="form-control" placeholder="Type feature here" v-model="feature">
    </div>
    <table class="table table-responsive" v-if="data.length > 0">
    <div class="row" v-for="(item, index) in data" :key="index">
        <div class="col-12 mt-3">
            <div class="card" style="min-height: 106px">
                <div class="card-horizontal">
                    <div class="card-body">
                        <div class="mb-3">
                            <span style="float:right">
                                <i class="fa fa-pencil ml-2 actionBtn" @click="showUpdate(item)"></i>
                                <i class="fa fa-trash ml-2 actionBtn" @click="showDeleteConfirmation(item)"></i>
                            </span>
                            <span><b  style="font-size:24px">{{item.payload_value}}</b><br>
                                Date Created: {{item.created_at}}
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
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
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
      data: [],
      canUpdate: false,
      item: null
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
        },
        {
          value: 'features',
          clause: '=',
          column: 'payload'
        }],
        limit: flag ? this.limit : this.offset + this.limit,
        offset: flag ? this.offset : 0,
        sort: sort
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('payloads/retrieve', parameter).then(response => {
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
      this.feature = item.payload_value
      this.canUpdate = true
    },
    update(){
      let parameter = {
        id: this.item.id,
        payload_value: this.feature
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('payloads/update', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data === true){
          this.canUpdate = false
          this.retrieve(this.currentSort, this.currentFilter, false)
        }
      })
    },
    showDeleteConfirmation(item){
      this.$refs.confirm.show(item.id)
    },
    remove(item){
      let parameter = {
        id: item.id
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('payloads/delete', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data !== null){
          this.retrieve(this.currentSort, this.currentFilter, false)
        }
      })
    },
    create(){
      if(this.features === null){
        this.errorMessage = 'All fields are required'
        return
      }
      let parameter = {
        account_id: this.user.userID,
        payload: 'features',
        payload_value: this.feature
      }
      this.APIRequest('payloads/create', parameter).then(response => {
        if(response.data > 0){
          this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
        }
      })
    }
  },
  components: {
    'filter-product': require('components/increment/ecommerce/filter/RoundedFilter.vue'),
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'confirmation': require('components/increment/generic/modal/Confirmation.vue'),
    'show-booking': require('modules/booking/ReserveeInformation.vue'),
    Pager,
    Confirmation
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
