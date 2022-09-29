<template>
  <div style="margin: 56px;">
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
              <div v-if="item.account_information !== null && item.account_information.first_name !== null">
                {{item.account_information.first_name}}
              </div>
              <div v-else>
                N/A
              </div>
            </div>
          </td>
          <td>
            <div style="text-align:center"><b>Contact Number</b> <br/>{{item.account_information.number_code}}{{item.account_information.cellular_number !== null ? item.account_information.cellular_number : 'N/A'}}</div>
          </td>
          <td>
            <div style="text-align:center"><b>Type</b> <br/>{{ editTypeIndex !== index ? item.account_type : ''}}
              <span @click="setEditTypeIndex(index, item)">
                &nbsp;&nbsp;<i class="fas fa-pencil-alt text-darkPrimary" v-if="editTypeIndex !== index"></i>
              </span>
              <div v-if="editTypeIndex === index">
                <select class="form-control" v-model="newAccountType">
                  <option v-for="(typeItem, typeIndex) in ['USER', 'ADMIN']" :key="typeIndex">{{typeItem}}</option>
                </select>
                <div>
                  <div @click="setEditTypeIndex(index, item)">
                    <i class="fas fa-times text-danger" style="float: right;"></i>
                  </div>
                  <div @click="updateType(item, index)">
                    <i class="fas fa-check text-primary" style="float: left;"></i>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div style="text-align:center"><b>Status</b> <br/>{{item.status}}</div>
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
      />
    </div>
    <empty v-if="data.length <= 0" :title="'Empty Accounts!'" :action="'No activity at the moment.'"></empty>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
export default {
  mounted() {
    this.retrieve({'username': 'asc'}, {column: 'username', value: ''}, false)
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
        }, {
          title: 'Type ascending',
          payload: 'type',
          payload_value: 'asc'
        }, {
          title: 'Type descending',
          payload: 'type',
          payload_value: 'desc'
        }, {
          title: 'Status ascending',
          payload: 'status',
          payload_value: 'asc'
        }, {
          title: 'Status descending',
          payload: 'status',
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
      this.APIRequest('accounts/update_type', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.setEditTypeIndex(index, item)
        this.retrieve(null, null)
      })
    },
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
        offset: flag === undefined && filter != null ? 0 : (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage,
        sort: sort !== null ? sort : this.currentSort,
        offset: flag === undefined && filter != null ? 0 : (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage,
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('accounts/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
          this.activePage = filter !== null ? 1 : this.activePage
          this.data = response.data
        }else{
          this.data = []
          this.numPages = null
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
