<template>
  <div style="margin: 56px;">
    <div class="mb-5">
      <span>
          <span @click="$router.push('/settings')" class="backBtn">
              <i class="fas fa-chevron-left"></i>
              Back
          </span>
      </span>
      <span style="float:right">
          <span>
              <b :class="active ? 'mr-5 actionBtn btn1' : 'mr-5 actionBtn btn2'" @click="room()">Room Add-ons</b>
              <b :class="active1 ? 'actionBtn btn2' : 'actionBtn btn1'" @click="room1()">Checkout Add-ons</b>
          </span>
      </span>
    </div>
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
      <button class="btn btn-primary pull-right" style="margin-bottom: 20px; padding-vertical: 4%; padding-top: 10px; padding-bottom: 27px" v-if="canUpdate === false" @click="create()">Add</button>
      <button class="btn btn-primary pull-right" style="margin-bottom: 25px; padding-top: 10px; padding-bottom: 27px" v-else @click="create()">Update</button>
      <input type="number" class="form-control" placeholder="Type default price" v-model="price">
      <input type="text" class="form-control addOns" placeholder="Type your add-ons here" v-model="addOns">
    </div>
    <table v-if="data !== null && data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data" style="height:102px;">
        <tr v-for="(item, index) in data" :key="index" class="table-row">
          <td style="padding:0px !important">
            <div class="row" style="margin-left: 2%;padding-right: 2%">
              <div class="col-md-6" style="padding: 20px 0px">
                <span style="font-size: 24px; font-weight: bold">{{item.title}}</span><br/>
                <span style="font-size: 12px">Date Created: {{item.created_at}}</span>
                <br><br>
              </div>
              <div class="col-md-6 column">
                <div class="actionBtn ml-2">
                  <i class="fas fa-pencil-alt" @click="showUpdate(item)"></i>
                  <span><i class="fas fa-trash"  @click="showDeleteConfirmation(item)"></i></span>
                </div>
                <div class="box mr-1">
                  <p class="box-title">Default Price</p>
                  <span><b>{{item.currency}} {{item.price}}</b></span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <empty v-if="data === null || data.length === 0" :title="'Empty Add-Ons!'" :action="'No activity at the moment.'"></empty>
    <Confirmation
      ref="confirm"
      :message="'Are you sure do you want to delete this Add-on?'"
      :title="'Confirmation'"
      @onConfirm="e => {
        remove(e)
      }"
    ></Confirmation>
    <errorModal
    ref="errorModal"
    :title="'Error Message'"
    :message="title"
    />
    <show-booking ref="booking"/>
  </div>
</template>
<script>
import AUTH from 'src/services/auth'
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import Confirmation from 'src/components/increment/generic/modal/Confirmation.vue'
import errorModal from 'src/components/increment/generic/Modal/Alert.vue'
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
          title: 'Title Ascending',
          payload: 'title',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Title Descending',
          payload: 'title',
          payload_value: 'desc',
          type: 'text'
        }, {
          title: 'Price Ascending',
          payload: 'price',
          payload_value: 'asc',
          type: 'text'
        }, {
          title: 'Price Descending',
          payload: 'price',
          payload_value: 'desc',
          type: 'text'
        }, {
          title: 'Created Ascending',
          payload: 'created_at',
          payload_value: 'asc',
          type: 'date'
        }, {
          title: 'Created Descending',
          payload: 'created_at',
          payload_value: 'desc',
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
      activePage: 1,
      addOns: null,
      price: 0,
      item: null,
      canUpdate: false,
      validated: false,
      title: null,
      active: true,
      active1: true
    }
  },
  components: {
    'filter-product': require('components/increment/ecommerce/filter/RoundedFilter.vue'),
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'show-booking': require('modules/booking/ReserveeInformation.vue'),
    errorModal,
    Pager,
    Confirmation
  },
  methods: {
    room(){
      this.active = true
      this.active1 = true
      this.retrieve({'created_at': 'asc'}, {column: 'created_at', value: ''}, false)
    },
    room1(){
      this.active = false
      this.active1 = false
      this.retrieve({'created_at': 'asc'}, {column: 'created_at', value: ''}, false)
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
        },
        {
          value: this.active === true ? 'room' : 'checkout',
          column: 'type',
          clause: 'like'
        }],
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage,
        sort: sort !== null ? sort : this.currentSort,
        account_id: this.user.userID
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('add-on/retrieve', parameter).then(response => {
        console.log('[sdfasdfasdf]', response)
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
    showUpdate(item){
      this.item = item
      this.price = item.price
      this.addOns = item.title
      this.canUpdate = true
    },
    showDeleteConfirmation(item){
      this.$refs.confirm.show(item.id)
      this.canUpdate = false
      this.price = 0
      this.addOns = null
    },
    remove(item){
      let parameter = {
        id: item.id
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('add-on/delete', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data > 0){
          this.retrieve(this.currentSort, this.currentFilter, false)
        }
      })
    },
    create(){
      if(this.validation() === true){
        if(this.canUpdate === false){
          let parameter = {
            account_id: this.user.userID,
            price: this.price,
            title: this.addOns,
            type: this.active === true ? 'room' : 'checkout',
            url: 'test',
            currency: 'PHP'
          }
          this.APIRequest('add-on/create', parameter).then(response => {
            if(response.data > 0){
              this.title = null
              this.price = 0
              this.addOns = null
              this.canUpdate = false
              this.retrieve(this.currentSort, this.currentFilter, false)
            }
            if(response.error !== null){
              this.title = response.error
              this.$refs.errorModal.show()
            }
          })
        }else{
          let parameter = {
            id: this.item.id,
            price: this.price,
            title: this.addOns,
            url: 'test',
            currency: 'PHP'
          }
          $('#loading').css({'display': 'block'})
          this.APIRequest('add-on/update', parameter).then(response => {
            $('#loading').css({'display': 'none'})
            if(response.data === true){
              this.canUpdate = false
              this.addOns = null
              this.title = null
              this.price = 0
              this.retrieve(this.currentSort, this.currentFilter, false)
            }
            if(response.error !== null){
              this.errorMessage = response.error
              this.$refs.errorModal.show()
            }
          })
        }
      }else{
        this.title = 'Please input your desired price and add-ons.'
        this.$refs.errorModal.show()
      }
    },
    validation(){
      if((this.addOns === null || this.addOns === undefined || this.addOns === '') && this.price === 0){
        this.validated = false
        this.title = 'Please input your desired price and add-ons.'
        this.$refs.errorModal.show()
        return this.validated
      }else if(this.addOns === null || this.addOns === undefined || this.addOns === ''){
        this.validated = false
        this.title = 'Please input your desired add-ons.'
        this.$refs.errorModal.show()
        return this.validated
      }else if(this.price === 0){
        this.validated = false
        this.title = 'Please input your desired price.'
        this.$refs.errorModal.show()
        return this.validated
      }else{
        this.validated = true
        return this.validated
      }

    }
    // retrieveMerchants(){
    //   let parameter = {
    //     condition: [{
    //       value: 1,
    //       column: 'account_id',
    //       clause: '='
    //     }]
    //   }
    //   this.APIRequest('merchants/retrieve_all', parameter).then(response => {
    //   })
    // }
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
    padding: 0;
  }
  .table-row{
    background-color:white;
  }
  .box{
    border: 1px $gray solid;
    padding: 10px;
    width: 40%;
    text-align: center;
    margin-top: 20px;
  }
  .actionBtn{
    text-align: center;
    margin-top: 20px;
  }
  .btn1{
    color: $primary;
    cursor: pointer;
  }
  .btn2{
    color: $secondary;
    cursor: pointer;
  }
  .fa-pencil, .fa-trash{
    font-size: 20px !important;
    cursor: pointer;
  }
  .fa-pencil{
    color: $primary;
  }
  .fa-trash{
    color: $danger
  }
  .column div{
    float: right;
    clear: none;
    margin-right: 2%;
  }
  .box-title{
    color: $secondary;
  }
  .form-control{
    width: 20%;
    float: right;
    margin-right: 10px;
    height: 40px !important
  }

  .addOns{
    width: 40%;
    float: right;
    margin-right: 10px;
    height: 40px !important
  }
</style>
