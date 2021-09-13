<template>
  <div style="margin:56px">
      <div style="width: 70%; padding: 30px; margin-left:auto; margin-right:auto;">
          <span>
              <span @click="$router.push('/coupons')" class="backBtn">
                  <i class="fa fa-chevron-left"></i>
                  Back
              </span>
          </span>
          <span style="float:right">
              <span>
                  <b class="mr-5 actionBtn" @click="$router.push('/bookings')">Go to Bookings</b>
                  <b class="actionBtn" @click="create()">Save</b>
              </span>
          </span>
          <span style="float:right">
              <span>
                  <b class="mr-5 actionBtn">Set Schedules & Limits</b>
              </span>
          </span>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Title</label>
                <div class="input-group">
                    <input v-model="title" type="text" class="form-control-custom form-control">
                </div>
            </div>
            <div class="col-md-6">
                <label>Room Type</label>
                <div class="input-group">
                    <select v-model="room_type" type="text" class="form-control-custom form-control">
                        <option value="pending">Junior Suite</option>
                        <option value="completed">Superior Suite</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <label>Description</label>
            <textarea 
            :class="description == '' ? 'form-control mb-0' : 'form-control'" 
            placeholder="Add description here" 
            rows="10" 
            :style="{
              ...description == '' ? {border: '1px solid red !important'} : '',
            }"
            v-model="description"
          >
          </textarea>
        </div>
        <div class="mt-4">
            <label>Features</label>
            <searchField
            :placeholder="'Select Features'"
            :items="feature"
            :styles="{
              background: 'none',
              color: '#84868B !important',
              width: '100% !important',
              borderRadius: '5px !important',
              border: 'none',
              border: !this.isValid && selectedFeature.length === 0 ? '1px solid red !important' : 'none',
              marginBottom: !this.isValid && selectedFeature.length === 0 ? '0px' : '35px'
            }"
            :dropdownItemStyles="{
              borderRadius: '5px',
              overflow: 'hidden',
              width: 'calc(100% - 30px)'
            }"
            :class="!this.isValid && selectedFeature.length === 0 ? 'multiselect__tags1' : 'none'"
            :selectedIndex="selectedIndex"
            @onSelect="onSelectAdd"
            v-if="!isClearing"
            ref="searchField"
          />
        </div>
        <div class="mt-4">
            <label>Add-ons</label>
            <searchField
            :placeholder="'Select Add-ons'"
            :items="addOns"
            :styles="{
              background: 'none',
              color: '#84868B !important',
              width: '100% !important',
              borderRadius: '5px !important',
              border: 'none',
              border: !this.isValid && selectedAddOns.length === 0 ? '1px solid red !important' : 'none',
              marginBottom: !this.isValid && selectedAddOns.length === 0 ? '0px' : '35px'
            }"
            :dropdownItemStyles="{
              borderRadius: '5px',
              overflow: 'hidden',
              width: 'calc(100% - 30px)'
            }"
            :class="!this.isValid && selectedAddOns.length === 0 ? 'multiselect__tags1' : 'none'"
            :selectedIndex="selectedIndex"
            @onSelect="onSelect"
            v-if="!isClearing"
            ref="searchField"
          />
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Regular Price</label>
                <div class="input-group">
                    <input v-model="regular_price"  type="number" class="form-control-custom form-control">
                    <select v-model="type" class="form-control" style="width:102px; height:60px">
                        <option value="PHP">PHP</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <label>Price Terms</label>
                <div class="input-group">
                    <select v-model="price_terms" type="text" class="form-control-custom form-control">
                        <option value="pending">Per Night</option>
                        <option value="completed">Per Day</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-6">
                <label>Non-Refundable Price</label>
                <div class="input-group">
                    <input v-model="non_price"  type="number" class="form-control-custom form-control">
                    <select v-model="type" class="form-control" style="width:102px; height:60px">
                        <option value="PHP">PHP</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <label>Status</label>
                <div class="input-group">
                    <select v-model="status" type="text" class="form-control-custom form-control">
                        <option value="pending">Publish</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="mt-4">
          <label>Images</label>
          <imageupload></imageupload>
        </div>
        <div class="row mt-4">
            <div class="col-md-8">
              <button class="btn btn-danger footerBtn">Delete</button>
            </div>
            <div class="col-md-2">
              <button class="btn btn-secondary footerBtn">Save</button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import AUTH from 'src/services/auth'
import searchField from 'src/modules/generic/searchField.vue'
import imageupload from 'src/modules/generic/ImageUpload.vue'
import COMMON from 'src/common.js'
export default {
  data(){
    return {
      data: null,
      user: AUTH.user,
      description: null,
      regular_price: null,
      price_terms: null,
      title: null,
      room_type: null,
      type: null,
      non_price: null,
      value: null,
      status: null,
      errorMessage: null,
      feature: COMMON.feature,
      addOns: COMMON.addOns,
      selectedFeature: [],
      selectedAddOns: [],
      isClearing: false,
      isValid: true,
      selectedIndex: null
    }
  },
  components: {
    searchField,
    imageupload
  },
  methods: {
    onSelect(data) {
      this.selectedFeature = data
      this.isEmpty = false
    },
    onSelectAdd(data) {
      this.selectedAddOns = data
      this.isEmpty = false
    },
    create(){
      if(this.description === null || this.selectedAddOns === null || this.selectedFeature === null || this.regular_price === null || this.price_terms === null || this.title === null || this.non_price === null || this.value === null || this.status === null || this.type === null
      ){
        this.errorMessage = 'All fields are required'
        return
      }else if(this.regular_price <= 0 || this.non_price <= 0){
        this.errorMessage = 'Value should be greater than 0'
        return
      }
      let parameter = {
        account_id: this.user.userID,
        title: this.title,
        description: this.description,
        status: this.status,
        price: this.regular_price,
        // not added sa db
        selectedFeature: this.selectedFeature,
        selectedAddOns: this.selectedAddOns,
        price_terms: this.price_terms,
        room_type: this.room_type,
        non_price: this.non_price,
        value: this.value
      }
      this.APIRequest('rooms/create', parameter).then(response => {
        if(response.data !== null){
          this.$router.push('/rooms')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
    .actionBtn{
        color: $secondary
    }
    .actionBtn:hover, .backBtn:hover{
        cursor: pointer;
    }
    .form-control-custom{
        width: 300px !important;
        height: 60px !important;
    }
    label{
        font-weight: bold;
    }
    .footerBtn{
        width: 150px;
        height: 50px
	}
</style>
