<template>
  <div class="LoginContainer col-sm-12">
    <div class="row RowContainer">
      <div class="col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xs-7 QouteCardContainer mb-5">
        <div class="QouteCard">
          <img :src="require('src/assets/img/logo.png')" alt="Image" style="width: 25%;height:auto;margin-left: 3%">
          <div class="SubQoute" style="margin-top: 1%; color: white">
            <h5 class="QouteText" style="color: white">Mezzo Hotel Admin App</h5>
            <p style="margin-right: 30%">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </div>
      </div>
      <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xs-5 d-flex justify-content-center LoginCardContainer mb-0">
        <div class="card LoginCard">
          <div class="card-body LoginCardBody">
            <div class="d-flex justify-content-center pt-3 pb-4 mb-3">
              <b>Request to Reset Password with Mezzo Hotel</b>
            </div>
            <div>
              <roundedInput
                :type="'text'"
                :styles="{
                  border: !this.isEmailError ? '.2px solid red !important' : 'none'
                }"
                :placeholder="'Email Address'"
                :class="'LoginField'"
                v-model="email"
              />
              <p
                class="mb-0 pb-0 invalidEmail"
                v-if="!this.isEmailError"
              >{{email == '' ? 'Required Field' :'Invalid email'}}</p>
            </div>
            <div class="message mt-1 mb-0">
              <i v-if="showResponse" class="resetPasswordMessage">We send recovery email to your email address at <u>{{email}}</u>. Please give us a moment, it may take few minutes. Please check your email address to continue.</i>
              <i v-if="showError" class="resetPasswordMessage" style="color:red">Something went wrong.</i>
            </div>
            <div class="d-flex justify-content-end">
              <roundedBtn 
                :onClick="reset"
                :text="'Send Request'"
                :styles="{
                  backgroundColor: colors.secondary,
                  color: 'white'
                }"
              />
            </div>
            <div class="d-flex justify-content-center orSeparatorB">
              <p style="color: #CBAB58;">Remembered your Account?</p>
            </div>
            <hr>
            <div class="col-sm-12 mb-3 col-md-12 col-lg-12 d-flex justify-content-end" style="margin-left: 4%">
              <roundedBtn 
                :onClick="redirect"
                :text="'Login'"
                :styles="{
                  backgroundColor: colors.primary,
                  color: 'white'
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dialogueBtn from 'src/modules/generic/dialogueBtn'
import roundedInput from 'src/modules/generic/roundedInput'
import roundedBtn from 'src/modules/generic/roundedBtn'
import COLORS from 'src/assets/style/colors.js'
import global from 'src/helpers/global'
export default {
  data() {
    return {
      email: '',
      showResponse: false,
      isEmailError: true,
      showError: false,
      colors: COLORS
    }
  },
  components: {
    dialogueBtn,
    roundedInput,
    roundedBtn
  },
  methods: {
    reset(event) {
      console.log('Reset password:::', global.validateEmail(this.email))
      this.showResponse = false
      this.showError = false
      if(global.validateEmail(this.email)){
        this.isEmailError = true
        let parameter = {
          email: this.email
        }
        this.APIRequest('accounts/request_reset', parameter).then(response => {
          if(response.data === true){
            console.log('ACCOUNTS RESPONSE: ', response)
            this.showResponse = true
            this.showError = false
          }else{
            this.showError = true
            this.showResponse = false
          }
        })
      }else{
        this.isEmailError = false
      }
    },
    redirect(event){
      this.$router.push('/login')
    },
    login(event) {
      console.log('login:::')
      this.$router.push('/')
    },
    forgotPassword(event) {
      console.log('forgot password:::')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.invalidEmail {
  color: $danger;
  font-size: 10px;
  margin-left: 20px;
}
.resetPasswordMessage {
  font-size: 12px;
}
.message {
  min-height: 50px;
}
.orSeparatorA {
  margin-top: 35px;
  margin-bottom: 15px;
}
.orSeparatorB {
  margin-top: 15px;
  margin-bottom: 20px;
}
.LoginField {
  margin-bottom: 0px;
}
.QouteText {
  font-size: 30px;
  font-weight: bold;
}
.SubQoute {
  text-align: left;
}
.QouteCard {
  width: 80% !important;
  margin-top: 5vh;
  margin-bottom: 5vh;
  text-align: left;
}
.LoginCard {
  width: 475px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
  -webkit-box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
  -moz-box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
}
.LoginCardBody {}
.LoginContainer {
  min-height: 91.8vh;
  background-color: $primary;
}
.RowContainer {
  background: $primary;
}
.QouteCardContainer {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background: $primary;
  margin-top: 5%;
}
.LoginCardContainer {
  margin-top: 7%;
  background: none;
  height: calc(100% + 10px);
}

@media (max-width: 500px) {
  .LoginCard {
    width: 100%;
  }
  .QouteText {
  font-size: 30px;
  }
}
@media(max-width: 1200px) {
  .QouteCardContainer {
    width: 90% !important;
  }
  .QouteText {
  font-size: 35px;
  }
}
@media (max-width: 1150px){
  .QouteCardContainer {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
  .LoginCardContainer {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
}
@media (max-width: 950px){
  .QouteCardContainer {
    -ms-flex: 0 0 40%;
    flex: 0 0 40%;
    max-width: 40%;
  }
  .LoginCardContainer {
    -ms-flex: 0 0 60%;
    flex: 0 0 60%;
    max-width: 60%;
  }
  .QouteText {
  font-size: 35px;
  }
}
@media (max-width: 768px){
  .QouteCardContainer {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
  .LoginCardContainer {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
  .QouteText {
  font-size: 35px;
  }
  .QouteCard img {
    width: 100% !important;
  }
}
</style>
