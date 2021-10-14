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
      <div class="col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xs-5 d-flex justify-content-center LoginCardContainer mb-5">
        <div class="card RegisterCard">
          <div class="card-body RegisterCardBody">
            <div class="d-flex justify-content-center pt-3 pb-4 mb-3">
              <b>Register with Mezzo Hotel</b>
            </div>
            <p
              class="mb-2 pb-0 errorMessage"
              v-if="errorMessage != null"
            >{{errorMessage}}</p>
            <div>
              <!-- <p class="mt-2"><b>Username</b></p> -->
              <roundedInput 
                :type="'text'"
                :placeholder="'Username'"
                :class="!this.isValid && username == '' ? 'mb-0 ' : ' registrationField'"
                :styles="{
                  border: !this.isValid && username == '' ? '1px solid red !important' : 'none',
                }"
                v-model="username"
              />
              <p
                class="mb-0 pb-0 requiredFieldError"
                v-if="!this.isValid && username == ''"
              >Required Field</p>
              <!-- <p class="mt-2"><b>Email</b></p> -->
              <roundedInput 
                :type="'text'"
                :placeholder="'Email Address'"
                :class="!this.isValid && (email == '' || !isEmailValid) ? 'mb-0 ' : ' registrationField'"
                :styles="{
                  border: !this.isValid && (email == '' || !isEmailValid) ? '1px solid red !important' : 'none',
                }"
                v-model="email"
              />
              <p
                class="mb-0 pb-0 requiredFieldError"
                v-if="!this.isValid && (email == '' || !isEmailValid)"
              >{{
                !isEmailValid ?
                  'Invalid Email'
                :
                  'Required Field'
              }}</p>
              <!-- <p class="mt-2"><b>Password</b></p> -->
              <roundedInput 
                :type="'password'"
                :placeholder="'Password'"
                :class="!this.isValid && (password == '' || password != cpassword || passwordRequirements != '') ? 'mb-0 ' : ' registrationField'"
                :styles="{
                  border: !this.isValid && (password == '' || password != cpassword || passwordRequirements != '') ? '1px solid red !important' : 'none',
                }"
                v-model="password"
              />
              <p
                class="mb-0 pb-0 requiredFieldError"
                v-if="!this.isValid && (password == '' || password != cpassword || passwordRequirements != '')"
              >{{
                password != cpassword ?
                  passwordRequirements != '' ?
                    passwordRequirements
                  :
                    'Password Did Not Match'
                :
                  passwordRequirements != '' ?
                    passwordRequirements
                  :
                  'Required Field'
              }}</p>
              <!-- <p class="mt-2"><b>Confirm Password</b></p> -->
              <roundedInput 
                :type="'password'"
                :placeholder="'Confirm Password'"
                :class="!this.isValid && (password == '' || password != cpassword || passwordRequirements != '') ? 'mb-0 ' : ' registrationField'"
                :styles="{
                  border: !this.isValid && (password == '' || password != cpassword || passwordRequirements != '') ? '1px solid red !important' : 'none',
                }"
                v-model="cpassword"
              />
              <p
                class="mb-0 pb-0 requiredFieldError"
                v-if="!this.isValid && (password == '' || password != cpassword || passwordRequirements != '')"
              >{{
                password != cpassword ?
                  passwordRequirements != '' ?
                    passwordRequirements
                  :
                    'Password Did Not Match'
                :
                  passwordRequirements != '' ?
                    passwordRequirements
                  :
                  'Required Field'
              }}</p>
            </div>
            <div class="d-flex justify-content-end">
              <roundedBtn 
                :onClick="register"
                :text="'Register'"
                :styles="{
                  backgroundColor: colors.secondary,
                  color: 'white'
                }"
              />
            </div>
            <div class="d-flex justify-content-center orSeparatorA">
              <p style="color: #CBAB58;">Have an account?</p>
            </div>
            <hr>
            <div class="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end" style="margin-left: 4%">
              <roundedBtn 
                :onClick="login"
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
import AUTH from 'src/services/auth'
import CONFIG from 'src/config'
import COMMON from 'src/common'
import global from 'src/helpers/global'
export default {
  data() {
    return {
      username: '',
      password: '',
      cpassword: '',
      email: '',
      config: CONFIG,
      common: COMMON,
      type: 'USER',
      global: global,
      isValid: true,
      isEmailValid: true,
      passwordRequirements: '',
      colors: COLORS,
      user: AUTH.user,
      errorMessage: null
    }
  },
  components: {
    dialogueBtn,
    roundedInput,
    roundedBtn,
    COLORS
  },
  methods: {
    login(event) {
      this.$router.push('/login')
    },
    register(event) {
      console.log('register:::')
      if(this.validate()) {
        this.isValid = true
        let parameter = {
          username: this.username,
          email: this.email,
          password: this.password,
          config: CONFIG,
          account_type: this.type,
          referral_code: null,
          status: 'ADMIN'
        }
        $('#loading').css({'display': 'block'})
        this.APIRequest('accounts/create', parameter).then(response => {
          $('#loading').css({'display': 'none'})
          if(response.error !== null){
            if(response.error.status === 100){
              let message = response.error.message
              if(typeof message.username !== undefined && typeof message.username !== 'undefined'){
                this.errorMessage = message.username[0]
              }else if(typeof message.email !== undefined && typeof message.email !== 'undefined'){
                this.errorMessage = message.email[0]
              }
            }else if(response.data !== null){
              if(response.data > 0){
                this.login()
              }
            }
          }
        })
      }
    },
    validate() {
      this.errorMessage = null
      let email = this.email
      let username = this.username
      let password = this.password
      let cpassword = this.cpassword
      if(email === '' || username === '' || password === '' || cpassword === ''){
        this.isValid = false
        return false
      }else if(username.includes(' ')){
        this.isValid = false
        this.errorMessage = 'Username should not contain spaces.'
        return false
      }else if(!global.validateEmail(email)) {
        this.isValid = false
        this.isEmailValid = false
        return false
      }else if(password !== cpassword) {
        if(global.validateEmail(email)) {
          this.isEmailValid = true
        }
        this.isValid = false
        return false
      }else if(!global.validatePassword(password)) {
        if(global.validateEmail(email)) {
          this.isEmailValid = true
        }
        this.isValid = false
        this.passwordRequirements = 'Password should be minimum of 6 and should contain at least one digit, lower case, upper case and special character.'
        return false
      }
      this.passwordRequirements = ''
      return true
    },
    forgotPassword(event) {
      console.log('forgot password:::')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.requiredFieldError {
  color: $danger;
  font-size: 10px;
  margin-left: 20px;
  margin-bottom: 25px !important;
}
.errorMessage {
  margin-top: -14px;
  color: $danger;
  margin-bottom: 25px !important;
  text-align: center;
}
.orSeparatorA {
  margin-top: 20px;
  margin-bottom: 15px;
}
.orSeparatorB {
  margin-top: 15px;
  margin-bottom: 35px;
}
.registrationField {
  margin-bottom: 20px;
}
.QouteText {
  font-size: 30px;
  // font-weight: bold;
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
.RegisterCard {
  margin-top: 5%;
  width: 475px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
  -webkit-box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
  -moz-box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
}
.RegisterCardBody {}
.LoginContainer {
  min-height: 91.9vh;
  background-color: $primary;
  padding-top: 3%;
}
.RowContainer {
  background-color: $primary !important;
}
.QouteCardContainer {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background: none;
}
.LoginCardContainer {
  background-color: transparent !important;
}

@media (max-width: 500px) {
  .RegisterCard {
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
