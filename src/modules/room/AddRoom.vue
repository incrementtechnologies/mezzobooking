<template>
  <div style="margin:56px">
    <span>
      <span @click="$router.push('/rooms')" class="backBtn">
        <i class="fas fa-chevron-left"></i>
        Back
      </span>
    </span>
    <span style="float:right">
      <span>
        <b class="mr-5 actionBtn" @click="$router.push('/bookings')">Go to Bookings</b>
        <b class="actionBtn" v-if="$route.params.code === undefined && $route.params.name === undefined" @click="create()">Save</b>
        <b class="actionBtn" v-if="$route.params.code !== undefined && $route.params.name === undefined" @click="update()">Update</b>
      </span>
    </span>
    <span style="float:right">
      <span>
        <b class="mr-5 actionBtn" v-if="$route.params.code != undefined" @click="$router.push('/set-availability/' + $route.params.code + '/' + status)">Set Schedules & Limits</b>
        <!-- <b class="mr-5 actionBtn" v-else @click="$router.push('/set-availability')">Set Schedules & Limits</b> -->
      </span>
    </span>
    <p style="color:red">{{errorMessage}}</p>
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
          <select v-model="room_type" class="form-control-custom form-control" :disabled="status==='publish'">
            <option v-for="(type, idx) in types" :key="idx" :value="type.id">{{type.payload_value}}</option>
            <!-- <option v-for="(type, idx) in types" :key="idx" :value="type.id" :selected="room_type.payload_value">{{type.payload_value}}</option> -->
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
      ref="searchFieldFeature"
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
            <input v-model="regular_price" min="1" type="number"  @input="event => regular_price = Math.abs(event.target.value)" class="form-control-custom form-control">
            <!-- <select v-model="type" class="form-control" style="width:102px; height:60px">
              <option value="PHP">PHP</option>
            </select> -->
          </div>
          <div>
            <input type="checkbox" id="checkbox" v-model="tax">
            <label style="font-weight: normal" for="checkbox">Including tax, utilities and all other fees.</label>
          </div>
      </div>
      <div class="col-md-6">
          <label>Price Terms</label>
          <div class="input-group">
            <select v-model="price_terms" type="text" class="form-control-custom form-control">
              <option value="per night">Per Night</option>
              <option value="per month">Per Month</option>
            </select>
          </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-6">
        <label>Refundable Price</label>
        <div class="input-group">
          <input v-model="non_price" type="number"  @input="event => non_price = Math.abs(event.target.value)" min="0" class="form-control-custom form-control">
          <!-- <select v-model="type" class="form-control" style="width:102px; height:60px">
              <option value="PHP">PHP</option>
          </select> -->
        </div>
      </div>
      <div class="col-md-6">
        <label>Status</label>
        <div class="input-group">
          <select v-model="roomStatus" type="text" class="form-control-custom form-control">
            <option value="pending">Pending</option>
            <option value="publish">Publish</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-6">
        <label>Maximum Capacity</label>
        <div class="input-group">
          <input v-model="maximum_capacity" min="1" type="number"  @input="event => maximum_capacity = Math.abs(event.target.value)" class="form-control-custom form-control">
        </div>
      </div>
    </div>
    <div class="mt-4">
      <label>Images</label>
      <imageupload :features="featured" @setImage="getImage($event)" :con="$route.params.name"></imageupload>
    </div>
    <div class="row mt-4">
      <div class="col-md-6">
        <button class="btn btn-danger footerBtn" v-if="$route.params.code === undefined && $route.params.name === undefined" @click="$router.push('/rooms')">Cancel</button>
        <button class="btn btn-danger footerBtn" v-if="$route.params.code !== undefined && $route.params.name === undefined" @click="showDeleteConfirmation($route.params.code)">Delete</button>
      </div>
      <!-- <div class="col-md-2" style="margin-left: 4%">
        <button class="btn btn-secondary footerBtn" @click="create()">Save</button>
      </div> -->
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
    if(this.$route.params.code != null){
      this.retrieveById(this.$route.params.code)
    }
  },
  data(){
    return {
      images: [],
      featured: [],
      data: null,
      user: AUTH.user,
      description: null,
      regular_price: null,
      price_terms: null,
      title: null,
      room_type: null,
      type: null,
      non_price: null,
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
      isUpdate: false,
      price_id: null,
      maximum_capacity: null,
      roomStatus: null,
      tax: 0,
      addOnPrice: []
    }
  },
  components: {
    searchField,
    imageupload,
    Confirmation,
    errorModal
  },
  methods: {
    getImage(event){
      let temp = {
        url: event.data
      }
      this.images.push(temp)
    },
    showDeleteConfirmation(id){
      this.$refs.confirm.show(id)
    },
    retrieveById(code){
      let parameter = {
        room_code: code
      }
      this.APIRequest('rooms/retrieve_by_code', parameter).then(response => {
        if(response.data.length > 0){
          this.maximum_capacity = response.data[0].max_capacity
          this.description = response.data[0].description
          this.regular_price = response.data[0].regular
          this.price_terms = response.data[0].label
          this.title = response.data[0].title
          this.type = response.data[0].label
          this.non_price = response.data[0].refundable
          this.type = response.data[0].currency
          this.status = response.data[0].status
          this.roomStatus = response.data[0].status
          this.tax = response.data[0].tax
          this.featured = response.data[0].images
          this.$refs.searchField.add_ons = Object.values(response.data[0].additional_info)[0]
          this.$refs.searchFieldFeature.features = Object.values(response.data[0].additional_info)[1]
          this.price_id = response.data[0].price_id
          this.room_type = response.data[0].category != null ? response.data[0].category.id : null
        }
      })
    },
    remove(id){
      let parameter = {
        condition: [
          {
            column: 'code',
            clause: '=',
            value: id.id
          }
        ]
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('rooms/delete_rooms', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data > 0){
          this.$router.push('/rooms')
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
      if(this.$route.params.code != null){
        parameter['code'] = 'update'
      }
      this.APIRequest('payloads/retrieve_with_validations', parameter, response => {
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
        type: 'room'
      }
      this.APIRequest('add-on/retrieve_all', parameter, response => {
        this.addOns = response.data
      })
    },
    // to be finalized
    onSelect(data) {
      this.selectedFeature = data.map(el => {
        return ({payload_value: el.payload_value, id: el.id})
      })
      this.isEmpty = false
    },
    onSelectAdd(data) {
      this.selectedAddOns = data.map(el => {
        return ({title: el.title, id: el.id, price: el.price})
      })
      this.isEmpty = false
    },
    update(){
      this.$refs.searchField.returnAddOn()
      this.selectedAddOns = this.selectedAddOns.map(el => {
        return ({title: el.title, id: el.id, price: el.price})
      })
      this.$refs.searchFieldFeature.returnFeature()
      this.selectedFeature = this.selectedFeature.map(el => {
        return ({payload_value: el.payload_value, id: el.id})
      })
      this.addOnPrice = this.selectedAddOns.map(el => {
        return (el.price)
      })
      let parameter = {
        id: this.$route.params.code,
        code: this.$route.params.code,
        account_id: this.user.userID,
        title: this.title,
        max_capacity: this.maximum_capacity,
        category: this.room_type,
        description: this.description,
        additional_info: JSON.stringify({add_ons: this.selectedAddOns, feature: this.selectedFeature}),
        status: this.roomStatus,
        images: this.images
      }
      this.APIRequest('rooms/update_with_images', parameter).then(response => {
        if(response.data >= 1 && this.price_id != null){
          let pricingParameter = {
            id: this.price_id,
            account_id: this.user.userID,
            room_id: response.data,
            regular: this.regular_price,
            refundable: this.non_price,
            currency: this.type,
            tax: this.tax === true ? 1 : 0,
            label: this.price_terms,
            addOnPrice: this.addOnPrice,
            category_id: this.room_type
          }
          this.APIRequest('pricings/update', pricingParameter).then(response => {
            console.log('[response]', response)
            if(response.data === true){
              this.$router.push('/rooms')
            }else{
              console.log('[Error in Updating Pricing]')
            }
          })
        }
      })
    },
    removeImage(data){
      let parameter = {
        id: data
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('room_images/delete', parameter, response => {
        $('#loading').css({'display': 'none'})
      })
    },
    create(){
      if(this.description === null || this.maximum_capacity === null || this.selectedAddOns === null || this.selectedFeature === null || this.regular_price === null || this.price_terms === null || this.title === null || this.roomStatus === null
      ){
        this.errorMessage = 'All fields are required'
        return
      }else if(this.regular_price <= 0){
        this.errorMessage = 'Value should be greater than 0'
        return
      }
      this.addOnPrice = this.selectedAddOns.map(el => {
        return (el.price)
      })
      let roomParameter = {
        account_id: this.user.userID,
        title: this.title,
        max_capacity: this.maximum_capacity,
        category: this.room_type,
        description: this.description,
        additional_info: JSON.stringify({add_ons: this.selectedAddOns, feature: this.selectedFeature}),
        status: this.roomStatus
      }
      this.APIRequest('rooms/create', roomParameter).then(response => {
        if(response.data > 0){
          let pricingParameter = {
            account_id: this.user.userID,
            room_id: response.data,
            regular: this.regular_price,
            refundable: this.non_price,
            tax: this.tax === true ? 1 : 0,
            currency: 'PHP',
            label: this.price_terms,
            category: this.room_type,
            addOnPrice: this.addOnPrice
          }
          let imageParameter = {
            room_id: response.data,
            url: this.images,
            status: 'room_images'
          }
          this.APIRequest('pricings/create', pricingParameter).then(response => {
            if(response.data > 0){
              this.$router.push('/rooms')
            }else{
              console.log('[Error in Creating Pricing]')
            }
          })
          this.APIRequest('room_images/create_with_image', imageParameter).then(response => {
            if(Number(response.data) > 0){
              console.log('[Successfully Added]')
            }
          })
        }else{
          this.errorMessage = response.error
          console.log('[error]', response.error)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.errorMessage {
  margin-top: 10px;
  color: $danger;
  font-size: 13px;
  text-align: center;
}
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
