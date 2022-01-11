<template>
  <div style="margin: 56px;">
    <div style="float:left">
      <Pager
        :pages="numPages"
        :active="activePage"
        :limit="limit"
        v-if="data !== null"
      />
    </div>
    <filter-product v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      :grid="['list']">
    </filter-product>
    
    <table v-if="data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data">
        <tr v-for="(item, index) in data" :key="index" class="table-row">
          <td>
            <b><span style="font-size: 14px">Date</span></b><br/>
            <span style="font-size: 12px">{{item.created_at}}</span>
          </td>
          <td>
            <div style="text-align:center"><b>Username</b> <br/>{{item.username}}</div>
          </td>
          <td>
            <div style="text-align:center"><b>Email Address</b> <br/><u>{{item.email}}</u></div>
          </td>
          <td>
            <div style="text-align:center"><b>Name</b><br/>
              <div v-if="item.account_information !== null">
                {{item.account_information.first_name}} - {{item.account_information.last_name}}
              </div>
              <div>
                N/A
              </div>
            </div>
          </td>
          <td>
            <div style="text-align:center"><b>Contact Number</b> <br/>{{item.account_information !== null ? item.account_information.cellular_number : 'N/A'}}</div>
          </td>
          <td>
            <div style="text-align:center"><b>Type</b> <br/>{{ editTypeIndex !== index ? item.account_type : ''}}
              <i class="fas fa-pencil text-primary" @click="setEditTypeIndex(index, item)" v-if="editTypeIndex !== index"></i>
              <span v-if="editTypeIndex === index">
                <i class="fas fa-times text-danger" style="float: right;" @click="setEditTypeIndex(index, item)"></i>
                <i class="fas fa-check text-primary" style="float: right;" @click="updateType(item, index)"></i>
                <select class="form-control" v-model="newAccountType" style="float: right; width: 45%;">
                  <option v-for="(typeItem, typeIndex) in ['USER', 'ADMIN']" :key="typeIndex">{{typeItem}}</option>
                </select>
              </span>
            </div>
          </td>
          <td>
            <div style="text-align:center"><b>Status</b> <br/>{{item.status}}</div>
          </td>
        </tr>
      </tbody>
    </table>
    <empty v-if="data.length <= 0" :title="'Empty Accounts!'" :action="'No activity at the moment.'"></empty>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
export default {
  mounted() {
    this.retrieve({'code': 'asc'}, {column: 'code', value: ''}, false)
  },
  data() {
    return {
      user: AUTH.user,
      data: [],
      auth: AUTH,
      selecteditem: null,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Username ascending',
          payload: 'username',
          payload_value: 'asc'
        }, {
          title: 'Username descending',
          payload: 'username',
          payload_value: 'desc'
        }, {
          title: 'Email ascending',
          payload: 'email',
          payload_value: 'asc'
        }, {
          title: 'Email descending',
          payload: 'email',
          payload_value: 'desc'
        }]
      }],
      filter: null,
      sort: null,
      editTypeIndex: null,
      newAccountType: null,
      selectedAccount: null,
      currentFilter: null,
      currentSort: null,
      offset: 0,
      limit: 5,
      numPages: null,
      activePage: 1
    }
  },
  components: {
    'filter-product': require('components/increment/ecommerce/filter/RoundedFilter.vue'),
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue'),
    Pager
  },
  methods: {
    setEditTypeIndex(index, item){
      if(index === this.editTypeIndex){
        this.editTypeIndex = null
        this.newAccountType = null
      }else{
        this.selectedAccount = item
        this.editTypeIndex = index
        this.newAccountType = item.account_type
      }
    },
    updateType(item, index){
      if(this.newAccountType === null || this.newAccountType === item.account_type){
        this.setEditTypeIndex(index, item)
        return
      }
      let parameter = {
        id: item.id,
        account_type: this.newAccountType
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('accounts/update_verification', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.setEditTypeIndex(index, item)
        this.retrieve(null, null)
      })
    },
    retrieve(sort, filter){
      if(sort !== null){
        this.sort = sort
      }
      if(filter !== null){
        this.filter = filter
      }
      if(sort === null && this.sort !== null){
        sort = this.sort
      }
      if(filter === null && this.filter !== null){
        filter = this.filter
      }
      let parameter = {
        condition: [{
          value: filter.value + '%',
          column: filter.column,
          clause: 'like'
        }, {
          value: 'ADMIN',
          column: 'account_type',
          clause: '='
        }],
        sort: sort !== null ? sort : this.currentSort
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('accounts/retrieve_accounts_admin', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
          this.data = response.data
        }else{
          this.data = null
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
