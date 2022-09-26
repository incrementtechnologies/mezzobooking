<template>
    <div style="margin: 56px">
        <section class="header">
            <span>
              <span @click="$router.push('/room-types')" class="backBtn">
                  <i class="fas fa-chevron-left"></i>
                  Back
              </span>
          </span>
          <span style="float:right">
              <span>
                <!-- <b class="mr-5 actionBtn" @click="$route.params.id !== undefined ? $router.push('/add-limits/room-types/' + $route.params.id) : $router.push('/add-limits/room-types')">Set Schedules & Limits</b> -->
                <b class="mr-5 actionBtn" v-if="data !== null" @click="$router.push(`/bookings/${type}/${data.id}`)">Go to Bookings</b>
                <b class="actionBtn" @click="saveType()">{{data === null ? 'Save' : 'Update'}}</b>
              </span>
          </span>
        </section>
        <section class="form mt-5">
             <label class="text-danger">{{errorMessage}}</label>
            <div>
                <label for="name">Room Type Name</label>
                <input type="text" v-model="type" class="form-control form-control-custom" placeholder="add room type name">
            </div>
             <div class="mt-4">
                <label for="name">Set Default Features</label>
                <searchField
                  :test="'payload'"
                  :placeholder="'Set Default Features'"
                  :items="feature"
                  :styles="{
                    background: 'none',
                    color: '#84868B !important',
                    width: '100% !important',
                    borderRadius: '5px !important',
                    border: 'none',
                    marginBottom: '35px'
                  }"
                  :dropdownItemStyles="{
                    borderRadius: '5px',
                    overflow: 'hidden',
                    width: 'calc(100% - 30px)'
                  }"
                  :class="'multiselect__tags1'"
                  :selectedIndex="selectedIndex"
                  @onSelect="onSelect"
                  v-if="!isClearing"
                  ref="searchFieldFeature"
                  />
             </div>
            <div class="mt-4">
                <label for="name">Description</label>
                <textarea class="form-control" v-model="description" placeholder="type description" style="height: 165px !important;"></textarea>
            </div>
            <div class="mt-4" style="display: flex; justify-content: space-between">
              <div style="width: 45%">
                <label for="name">Max Capacity</label>
                <input type="number" v-model="capacity" class="form-control form-control-custom" placeholder="add max capacity">
              </div>
              <div style="width: 45%">
                <label for="name">Pricing Label</label>
                <select class="form-control form-control-custom" v-model="price_label">
                  <option value="Per night">Per night</option>
                  <option value="Per month">Per month</option>
                </select>
              </div>
            </div>
             <div class="mt-4 toggleSwitch">
                <label for="name">Apply Extra person's rate:</label>
                <i :class="`icon fas ${personsRate ? 'fa-toggle-on' : 'fa-toggle-off'}`" @click="personsRate=!personsRate"></i>
            </div>
             <div class="mt-4 toggleSwitch">
                <label for="name">Apply Tax:</label>
                <i :class="`icon fas ${taxRate ? 'fa-toggle-on' : 'fa-toggle-off'}`" @click="taxRate=!taxRate"></i>
            </div>
        </section>
        <section class="imageUpload">
          <label for="images">Featured Images</label>
          <ImageUpload :features="featured" @setImage="getImage($event)"/>
        </section>
    </div>
</template>

<script>
import ImageUpload from 'modules/generic/ImageUpload.vue'
import searchField from 'src/modules/generic/searchField.vue'
import AUTH from 'src/services/auth'
export default {
  mounted(){
    this.retrieve()
    this.retrieveFeature()
  },
  data(){
    return{
      user: AUTH.user,
      images: [],
      type: null,
      description: null,
      errorMessage: null,
      featured: [],
      data: null,
      isClearing: false,
      selectedIndex: null,
      feature: [],
      selectedFeatures: [],
      isEmpty: false,
      personsRate: true,
      taxRate: true,
      capacity: null,
      price_label: null
    }
  },
  components: {
    ImageUpload,
    searchField
  },
  methods: {
    getImage(event){
      let temp = {
        url: event.data
      }
      this.images.push(temp)
    },
    saveType(){
      if(this.type === null){
        this.errorMessage = 'Type field is required'
        return
      }
      if(this.capacity <= 0 || this.capacity == null){
         this.errorMessage = 'Invalid capcity value'
         return
      }
      let parameter = {
        account_id: this.user.userID,
        payload: 'room_type',
        category: this.description,
        payload_value: this.type,
        images: this.images,
        status: 'create',
        details: JSON.stringify(this.selectedFeatures),
        capacity: this.capacity,
        tax: this.taxRate,
        person_rate: this.personsRate,
        price_label: this.price_label
      }
      $('#loading').css({'display': 'block'})
      if(this.data === null){
        this.APIRequest('room_types/create_with_images', parameter, response => {
          $('#loading').css({'display': 'none'})
          this.errorMessage = null
          if(response.error !== null){
            this.errorMessage = response.error
          }else{
            this.$router.push('/room-types')
          }
        })
      }else{
        parameter['id'] = this.data.id
        parameter['status'] = 'update'
        this.APIRequest('room_types/update_with_images', parameter, response => {
          $('#loading').css({'display': 'none'})
          this.$router.push('/room-types')
          this.errorMessage = null
        })
      }
    },
    retrieve(){
      if(this.$route.params.id !== undefined){
        let parameter = {
          code: this.$route.params.id
        }
        this.APIRequest('room_types/retrieve_details_by_code', parameter, response => {
          if(response.data !== null){
            this.data = response.data
            this.description = response.data.category
            this.type = response.data.payload_value
            this.featured = response.data.images
            this.capacity = response.data.capacity,
            this.personsRate = response.data.person_rate,
            this.taxRate = response.data.tax,
            this.price_label = response.data.price_label
            this.$refs.searchFieldFeature.features = Object.values(response.data.details)
          }
        })
      }
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
    onSelect(data) {
      this.selectedFeatures = data.map(el => {
        return ({payload_value: el.payload_value, id: el.id})
      })
      this.isEmpty = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.actionBtn{
    color:$secondary
}
.actionBtn:hover, .backBtn:hover{
        cursor: pointer;
}
.form-control-custom{
    // width: 300px !important;
    height: 45px !important;
}
label{
    font-weight: bold;
}
.imageUpload{
  margin-top: 2%;
  margin-bottom: 10%;
}
.icon{
  font-size: 30px;
}
.toggleSwitch{
  align-items: center;
  display: flex;
  gap: 5px;
}
</style>
