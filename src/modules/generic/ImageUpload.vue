<template>
<div>
  <p class="text-danger">{{imageError}}</p>
  <div class="row ml-1">
      <div class="column" v-for="(image, idx) in features" :key="idx">
        <div class="container">
          <img :src="image.url.includes('blob') === true ? image.url : image.url.includes('https') ? image.url : config.BACKEND_URL + image.url" class="image">
          <div class="overlay" v-if="con === undefined">
            <label class="removeIcon">
              <i class="fas fa-close removeImage" @click="removeImage(image)"></i>
            </label>
          </div>
        </div>
      </div>
      <div class="column" v-if="con === undefined"> 
        <div class="container">  
          <div class="addImage" @click="clickAddImage()">
              <input type="file" hidden ref="fileInput" @change="getFile($event)">
              <i class="fas fa-plus addIcon"></i>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import AUTH from 'src/services/auth'
import axios from 'axios'
import CONFIG from 'src/config.js'
export default {
  props: ['features', 'con'],
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
      console.log('[IMAGE]', this.image)
      let formData = new FormData()
      formData.append('file', this.image)
      formData.append('file_url', this.image.name.replace(' ', '_'))
      formData.append('account_id', this.user.userID)
      formData.append('payload', 'room_type')
      $('#loading').css({'display': 'block'})
      axios.post(this.config.BACKEND_URL + '/images/upload?token=' + AUTH.tokenData.token, formData).then(response => {
        $('#loading').css({'display': 'none'})
        this.imageError = null
        let temp = {
          url: URL.createObjectURL(this.image)
        }
        console.log('><>>>>>', temp)
        this.features.push(temp)
        if(response.data !== null){
          this.$emit('setImage', response.data)
        }
      })
    },
    removeImage(data){
      this.features.splice(this.features.indexOf(data), 1)
      if(data.id !== undefined){
        this.$parent.removeImage(data.id)
      }
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
.addImage:hover{
    background-color: $secondary;
}
.addImage:active{
    background-color: #CCCCCC
}
.image{
    height: 191px;
    width: 191px;
}
.removeImage{
  padding: 4px;
  // color: white;
}
.container:hover .overlay {
  opacity: 1;
}

.container:hover .image {
  opacity: 0.3;
  background: white;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 90%;
  right: 0;
  height: 10%;
  width: 20%;
  opacity: 0;
  transition: .3s ease;
  // background-color: red;
}

.removeIcon{
  color: red;
  font-size: 30px;
  height: 25px;
  position: absolute;
  top: 0%;
  right: 30%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(50%, -50%);
  text-align: center
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

