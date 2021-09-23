<template>
  <div style="margin:56px">
    <span>
        <span @click="$router.push('/rooms')" class="backBtn">
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
            <b class="mr-5 actionBtn" @click="$router.push('/set-availability')">Set Schedules & Limits</b>
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
              <select v-model="room_type" class="form-control-custom form-control">
                <option v-for="(type, idx) in types" :key="idx" :value="type.id">{{type.payload_value}}</option>
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
        :test="'payload'"
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
        @onSelect="onSelect"
        v-if="!isClearing"
        ref="searchField"
      />
    </div>
    <div class="mt-4">
        <label>Add-ons</label>
        <searchField
        :test="'title'"
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
        @onSelectAdd="onSelectAdd"
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
      <imageupload :features="images" @setImage="getImage($event)"></imageupload>
    </div>
    <div class="row mt-4">
        <div class="col-md-9">
          <button class="btn btn-danger footerBtn" @click="showDeleteConfirmation()">Delete</button>
        </div>
        <div class="col-md-2" style="margin-left: 4%">
          <button class="btn btn-secondary footerBtn" @click="create()">Save</button>
        </div>
    </div>
    <Confirmation
      ref="confirm"
      :message="'Are you sure do you want to delete this room?'"
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
  </div>
</template>

<script>
import AUTH from 'src/services/auth'
import searchField from 'src/modules/generic/searchField.vue'
import imageupload from 'src/modules/generic/ImageUpload.vue'
import Confirmation from 'src/components/increment/generic/modal/Confirmation.vue'
import errorModal from 'src/components/increment/generic/Modal/Alert.vue'
export default {
  mounted() {
    this.retrieveType()
    this.retrieveFeature()
    this.retrieveAddOns()
    console.log('[user]', this.user)
  },
  data(){
    return {
      images: [],
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
      feature: [],
      addOns: [],
      selectedFeature: [],
      selectedAddOns: [],
      isClearing: false,
      isValid: true,
      selectedIndex: null,
      types: [],
      tempImage: [],
      isUpdate: false
    }
  },
  components: {
    searchField,
    imageupload,
    Confirmation,
    errorModal
  },
  methods: {
    getImage(e){
      this.tempImage.push(e)
    },
    // final
    showDeleteConfirmation(){
      // lacking id inside show
      this.$refs.confirm.show()
      this.canUpdate = false
      this.price = 0
      this.addOns = null
    },
    remove(item){
      let parameter = {
        // id: item.id
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('add-on/delete', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data > 0){
          this.retrieve(this.currentSort, this.currentFilter, false)
        }
      })
    },
    retrieveType(){
      let parameter = {
        condition: [
          {
            column: 'payload',
            clause: '=',
            value: 'room_type'
          }
        ]
      }
      this.APIRequest('payloads/retrieve', parameter, response => {
        this.types = response.data
      })
    },
    retrieveFeature(){
      let parameter = {
        condition: [
          {
            column: 'payload',
            clause: '=',
            value: 'feature'
          }
        ]
      }
      this.APIRequest('payloads/retrieve', parameter, response => {
        this.feature = response.data
      })
    },
    retrieveAddOns(){
      let parameter = {
        condition: [
          {
            column: 'account_id',
            clause: '=',
            value: this.user.userID
          }
        ]
      }
      this.APIRequest('add-on/retrieve_all', parameter, response => {
        this.addOns = response.data
      })
    },
    // to be finalized
    onSelect(data) {
      this.selectedFeature = data
      this.isEmpty = false
    },
    onSelectAdd(data) {
      data.map(el => {
        this.selectedAddOns.push(el.title)
      })
      this.isEmpty = false
    },
    create(){
      // if(this.description === null || this.selectedAddOns === null || this.selectedFeature === null || this.regular_price === null || this.price_terms === null || this.title === null || this.non_price === null || this.value === null || this.status === null || this.type === null
      // ){
      //   this.errorMessage = 'All fields are required'
      //   return
      // }else if(this.regular_price <= 0 || this.non_price <= 0){
      //   this.errorMessage = 'Value should be greater than 0'
      //   return
      // }
      // save to room
      let parameter = {
        code: this.user.code,
        account_id: this.user.userID,
        title: this.title,
        category: this.room_type,
        description: this.description,
        additional_info: JSON.stringify(this.selectedAddOns),
        status: this.status
        // not added sa db
        // price: this.regular_price,
        // selectedFeature: this.selectedFeature,
        // price_terms: this.price_terms,
        // non_price: this.non_price,
        // value: this.value
      }
      console.log('[rooms]', parameter)
      this.APIRequest('room/create', parameter).then(response => {
        console.log('[response in rooms]', response)
        if(response.data > 0){
          
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
