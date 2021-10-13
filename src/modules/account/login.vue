<template>
  <div class="LoginContainer col-sm-12">
    <div class="row RowContainer">
      <div class="col-sm-7 col-md-7 col-lg-7 col-xl-7 col-xs-7 QouteCardContainer mb-5">
        <div class="QouteCard">
          <img :src="require('src/assets/img/logo.png')" alt="Image" style="width: 25%;height:auto;margin-left: 3%">
          <div class="SubQoute" style="margin-top: 5%; color: white">
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
        <div class="card LoginCard">
          <div class="card-body LoginCardBody">
            <div class="d-flex justify-content-center pt-3 pb-4 mb-3">
              <b>Login with Mezzo Hotel</b>
            </div>
            <div>
              <p
                class="mb-2 pb-0 errorMessage"
                v-if="errorMessage != ''"
              >{{errorMessage}}</p>
              <roundedInput 
                :type="'text'"
                :placeholder="'Username'"
                :class="!this.isValid && username == '' ? 'mb-0 ' : ' LoginField'"
                :styles="{
                  border: !this.isValid && username == '' ? '1px solid red !important' : 'none',
                }"
                v-model="username"
              />
              <p
                class="mb-0 pb-0 invalidEmail"
                v-if="!this.isValid && username == ''"
              >Required Field</p>
              <roundedInput 
                :type="'password'"
                :placeholder="'Password'"
                :class="!this.isValid && password == ''? 'mb-0 ' : ' LoginField'"
                :styles="{
                  border: !this.isValid && password == '' ? '1px solid red !important' : 'none'
                }"
                v-model="password"
                :onEnter="login"
              />
              <p
                class="mb-0 pb-0 invalidEmail"
                v-if="!this.isValid && password == ''"
              >Required Field</p>
            </div>
            <div class="d-flex justify-content-between">

              <roundedBtn
                :onClick="forgotPassword"
                :text="'Forgot your password?'"
                :styles="{
                  background: 'none',
                  color: '272727'
                }"
              />
              <roundedBtn 
                :onClick="login"
                :text="'Login'"
                :styles="{
                  backgroundColor: colors.secondary,
                  color: 'white'
                }"
              />
            </div>
            <div class="d-flex justify-content-center orSeparatorB">
              <p style="color: #CBAB58;">Don't have an account?</p>
            </div>
            <hr>
            <div class="col-sm-12 col-md-12 col-lg-12 d-flex justify-content-end" style="margin-left: 4%">
              <roundedBtn 
                :onClick="register"
                :text="'Register Now'"
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
import ROUTER from 'src/router'
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isValid: true,
      colors: COLORS,
      user: AUTH.user
    }
  },
  components: {
    dialogueBtn,
    roundedInput,
    roundedBtn
  },
  mounted() {},
  methods: {
    login(event) {
      if(this.username !== '' && this.password !== '') {
        this.isValid = true
        $('#loading').css({'display': 'block'})
        AUTH.authenticate(this.username, this.password, (response) => {
          $('#loading').css({'display': 'none'})
          ROUTER.push(`/dashboard`)
        }, (response, status) => {
          $('#loading').css({'display': 'none'})
          if(status === 401){
            this.errorMessage = 'Username and Password did not match.'
          }else if(status === 402){
            this.errorMessage = response.error
          }
        })
      }else{
        this.isValid = false
      }
    },
    register(event) {
      console.log('register:::')
      this.$router.push('/signup')
    },
    forgotPassword(event) {
      console.log('forgot password:::')
      this.$router.push('/request_reset_password')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
.errorMessage {
  margin-top: -14px;
  color: $danger;
  font-size: 10px;
  margin-bottom: 25px !important;
  text-align: center;
}
.invalidEmail {
  color: $danger;
  font-size: 10px;
  margin-left: 20px;
  margin-bottom: 25px !important;
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
  margin-bottom: 20px;
}
.QouteText {
  font-size: 30px;
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
  background-color: $primary;
  border-radius: 20px;
  box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
  -webkit-box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
  -moz-box-shadow: 3px 3px 1px -2px rgba(1,0,154,0.75);
  max-height: 42.5rem;
}
.LoginCardBody {
  background-color: white;
  border-radius: 20px;
}
.LoginContainer {
  padding-top: 3%;
  min-height: 91.9vh;
  background-color: $primary;
}
.RowContainer {
  background-color: $primary;
}
.QouteCardContainer {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background: none;
  margin-top: 5%;
}
.LoginCardContainer {
  background-color: $primary;
  margin-top: 5%;
}

@media (max-width: 500px) {
  .LoginCard {
    width: 100%;
    max-height: 50.5rem;
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
