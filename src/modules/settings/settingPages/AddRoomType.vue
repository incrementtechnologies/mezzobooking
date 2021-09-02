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
                <b class="mr-5 actionBtn">Set Schedules & Limits</b>
                <b class="mr-5 actionBtn">Go to Bookings</b>
                <b class="actionBtn" @click="saveType()">Save</b>
              </span>
          </span>
        </section>
        <section class="form mt-5">
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
          <ImageUpload @setImage="getImage($event)"/>
        </section>
    </div>
</template>

<script>
import ImageUpload from 'modules/generic/ImageUpload.vue'
import AUTH from 'src/services/auth'
export default {
  data(){
    return{
      user: AUTH.user,
      images: [],
      type: null,
      description: null
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
      let payloadValue = {
        images: this.images,
        description: this.description
      }
      let parameter = {
        account_id: this.user.userID,
        payload: 'room_type',
        category: this.type,
        payload_value: JSON.stringify(payloadValue)
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('payloads/create', parameter, response => {
        $('#loading').css({'display': 'none'})
      })
    },
    retrieve(){
      let parameter = this.$route.params.id
      this.APIRequest('payloads/retrieveById', parameter, response => {
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
