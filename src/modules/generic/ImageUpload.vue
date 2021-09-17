<template>
  <div class="row ml-1">
      <div class="column" v-for="(image, idx) in features" :key="idx">
        <img :src="image.url.includes('blob') === true ? image.url : config.BACKEND_URL + image.url" class="image">
        <!-- <div class="removeIcon">
          <i class="fa fa-close removeImage"></i>
        </div> -->
      </div>
      <div class="column">    
        <div class="addImage" @click="clickAddImage()">
            <input type="file" hidden ref="fileInput" @change="getFile($event)">
            <i class="fa fa-plus addIcon"></i>
        </div>
      </div>
  </div>
</template>

<script>
import AUTH from 'src/services/auth'
import axios from 'axios'
import CONFIG from 'src/config.js'
export default {
  props: ['features'],
  data(){
    return {
      imageError: null,
      image: null,
      user: AUTH.user,
      config: CONFIG,
      images: []
    }
  },
  methods: {
    clickAddImage(){
      this.$refs.fileInput.click()
    },
    getFile(event){
      this.image = event.target.files[0]
      let fileName = this.image.name.toLowerCase()
      if(fileName.substring(fileName.lastIndexOf('.')) === '.png' || fileName.substring(fileName.lastIndexOf('.')) === '.jpg' || fileName.substring(fileName.lastIndexOf('.')) === '.jpeg' || fileName.substring(fileName.lastIndexOf('.')) === '.gif' || fileName.substring(fileName.lastIndexOf('.')) === '.tif' || fileName.substring(fileName.lastIndexOf('.')) === '.bmp'){
        this.createFile(this.image)
      }else{
        this.imageError = 'Upload images only!'
        this.image = null
      }
    },
    createFile(file){
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      this.upload()
    },
    upload(){
      if(parseInt(this.image.size / 1024) > 1024){
        this.imageError = 'Allowed size is up to 1 MB only'
        this.image = null
        return
      }
      let formData = new FormData()
      formData.append('file', this.image)
      formData.append('file_url', this.image.name.replace(' ', '_'))
      formData.append('account_id', this.user.userID)
      formData.append('payload', 'room_type')
      $('#loading').css({'display': 'block'})
      axios.post(this.config.BACKEND_URL + '/images/upload?token=' + AUTH.tokenData.token, formData).then(response => {
        $('#loading').css({'display': 'none'})
        let temp = {
          url: URL.createObjectURL(this.image)
        }
        this.features.push(temp)
        if(response.data !== null){
          this.$emit('setImage', response.data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.addImage{
    height: 191px;
    width: 191px;
    border: 1px solid #CCCCCC;
}
.addIcon{
    font-size: 70px;
    color: #CCCCCC;
    padding: 60px 70px 
}
.addImage:hover, .removeIcon:hover{
    background-color: $secondary;
}
.addImage:active{
    background-color: #CCCCCC
}
.image{
    height: 191px;
    width: 191px;
}
.image:hover{
  display: block !important;
}
.removeImage{
  padding: 4px;
  color: white;
}
.removeIcon{
  position: absolute;
  left: 36.7%;
  bottom: 41%;
  background-color: red;
  padding: 3px;
  // height: 25px;
  border-radius: 50px;
  // display: none;
}
.removeIcon:hover{
  cursor: pointer;
}
.row {
  display: flex;
}
.column {
  padding: 5px;
}
</style>

