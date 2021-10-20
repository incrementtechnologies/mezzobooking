<template>
    <div style="margin: 56px">
        <section class="header">
            <span>
              <span @click="$router.push('/room-types')" class="backBtn">
                  <i class="fa fa-chevron-left"></i>
                  Back
              </span>
          </span>
          <span style="float:right">
              <span>
                <b class="mr-5 actionBtn" @click="$route.params.id !== undefined ? $router.push('/add-limits/' + $route.params.id) : $router.push('/add-limits')">Set Schedules & Limits</b>
                <b class="mr-5 actionBtn">Go to Bookings</b>
                <b class="actionBtn" @click="saveType()">Save</b>
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
                <label for="name">Description</label>
                <textarea class="form-control" v-model="description" placeholder="type description" style="height: 165px !important;"></textarea>
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
import AUTH from 'src/services/auth'
export default {
  mounted(){
    this.retrieve()
  },
  data(){
    return{
      user: AUTH.user,
      images: [],
      type: null,
      description: null,
      errorMessage: null,
      featured: [],
      data: null
    }
  },
  components: {
    ImageUpload
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
      let parameter = {
        account_id: this.user.userID,
        payload: 'room_type',
        category: this.description,
        payload_value: this.type,
        images: this.images,
        status: 'create'
      }
      $('#loading').css({'display': 'block'})
      if(this.data === null){
        this.APIRequest('payloads/create_with_images', parameter, response => {
          $('#loading').css({'display': 'none'})
          this.$router.push('/room-types')
          this.errorMessage = null
        })
      }else{
        parameter['id'] = this.data.id
        parameter['status'] = 'update'
        this.APIRequest('payloads/update_with_images', parameter, response => {
          $('#loading').css({'display': 'none'})
          this.$router.push('/room-types')
          this.errorMessage = null
        })
      }
    },
    retrieve(){
      if(this.$route.params.id !== undefined){
        let parameter = {
          id: this.$route.params.id
        }
        this.APIRequest('payloads/retrieve_by_id', parameter, response => {
          if(response.data !== null){
            this.data = response.data
            this.description = response.data.category
            this.type = response.data.payload_value
            this.featured = response.data.images
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
    height: 60px !important;
}
label{
    font-weight: bold;
}
.imageUpload{
  margin-top: 2%;
  margin-bottom: 10%;
}
</style>
