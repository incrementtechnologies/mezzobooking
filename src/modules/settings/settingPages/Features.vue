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
      <button class="btn btn-primary pull-right" style="margin-bottom: 25px;" @click="$router.push('/add-coupons')">Add</button>
      <input type="text" class="form-control" placeholder="Type feature here">
    </div>
    <table class="table table-responsive">
    <div class="row">
        <div class="col-12 mt-3">
            <div class="card" style="min-height: 106px">
                <div class="card-horizontal">
                    <div class="card-body">
                        <div class="mb-3">
                            <span style="float:right">
                                <i class="fa fa-pencil ml-2 actionBtn" @click="$router.push('/add-room-types')"></i>
                                <i class="fa fa-trash ml-2 actionBtn"></i>
                            </span>
                            <span><b  style="font-size:24px">1 King Bed</b><br>
                                Date Created: 2021-09-02 06:10:02
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </table>
  </div>
</template>

<script>
import Pager from 'src/components/increment/generic/pager/PagerEnhance.vue'
import COMMON from 'src/common.js'
import AUTH from 'src/services/auth'
export default {
  data(){
    return {
      numPages: null,
      activePage: 1,
      offset: 0,
      limit: 5,
      currentFilter: null,
      currentSort: null,
      user: AUTH.user,
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
      }]
    }
  },
  components: {
    'filter-product': require('components/increment/ecommerce/filter/RoundedFilter.vue'),
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'confirmation': require('components/increment/generic/modal/Confirmation.vue'),
    'show-booking': require('modules/booking/ReserveeInformation.vue'),
    Pager
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
