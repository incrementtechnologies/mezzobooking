<template>
    <div style="margin: 56px;">
        <b>Settings</b>
        <div class="row cards" v-for="(menu, idx) in common.settingsTabMenu" :key="idx" @click="redirect(menu.route)">
            <div class="col-md-10 column">
                <p>
                  <b>{{menu.title}}</b><br>
                  {{menu.description}}
                </p>
            </div>
            <div class="col-md-2 column">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
        <div class="row cards">
          <div class="col-md-10 column">
                <p>
                  <b>ChatBot Settings</b><br>
                  Enable chatbot settings
                </p>
            </div>
            <div class="col-md-2 column">
              <div @click="toggleSwitch()">
                <i class="icon fas " :class="{'fa-toggle-off': toggle === false, 'fa-toggle-on': toggle == true}"></i>
              </div>
            </div>
        </div>
        <!-- <div class="row cards">
          <div class="col-md-10 column">
                <p>
                  <b>Reservation can cater</b><br>
                  Enter the number of reservation that you can cater per day
                </p>
            </div>
            <div class="col-md-2 column">
              <div class="d-flex" v-if="isEdit===false" style="justify-content:center;align-items:center">
                <h5 class="text-warning">{{noOfReservations}}</h5>&nbsp;
                <i class="fas fa-pencil-alt" @click="isEdit=true"></i>
              </div>
              <div v-else class="d-flex" style="justify-content:center;align-items:center">
                <input class="form-control" type="number" v-model="noOfReservations"/>
                <i class="fas fa-check" @click="handleUpdateReservations()"></i>
              </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import COMMON from 'src/common.js'
import AUTH from 'src/services/auth'
export default {
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      common: COMMON,
      toggle: false,
      user: AUTH.user,
      isEdit: false,
      noOfReservations: 0
    }
  },
  computed: {
    isToggle(){
      return this.toggle
    }
  },
  methods: {
    redirect(route){
      this.$router.push(route)
    },
    toggleSwitch(){
      this.toggle = !this.toggle
      console.log(this.isToggle)
      this.create()
    },
    create(){
      let params = {
        payload: 'chatbot',
        payload_value: this.toggle,
        account_id: this.user.userID
      }
      this.APIRequest('payloads/enable_toggle', params, response => {
        this.retrieve()
      })
    },
    retrieve(){
      let params = {
        condition: [
          {
            column: 'account_id',
            clause: '=',
            value: this.user.userID
          },
          {
            column: 'payload',
            clause: '=',
            value: 'chatbot'
          }
        ]
      }
      this.APIRequest('payloads/retrieve', params, response => {
        if(response.data.length > 0){
          this.toggle = response.data[0].payload_value === 'true'
        }
      })
    },
    handleUpdateReservations(){
      let params = {
        payload: 'reservations',
        payload_value: this.noOfReservations,
        account_id: this.user.userID
      }
      this.APIRequest('payloads/enable_toggle', params, response => {
        this.isEdit = false
        this.retrieve()
      })
    },
    handleRetrieveNoOfReservations(){
      let params = {
        condition: [
          {
            column: 'account_id',
            clause: '=',
            value: this.user.userID
          },
          {
            column: 'payload',
            clause: '=',
            value: 'reservations'
          }
        ]
      }
      this.APIRequest('payloads/retrieve', params, response => {
        if(response.data.length > 0){
          this.noOfReservations = response.data[0].payload_value
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
    .cards{
      height: 100px;
      background-color: white;
      margin-top: 3%;
    }
    .cards:hover{
      cursor: pointer;
      background: rgba(0,0,0, 0.1)
    }
    .column{
      margin: auto;
      padding: 20px;
    }
    .column i{
      float: right;
      color: $secondary;
      font-size: 20px
    }
    .column .icon{
      font-size: 30px;
    }
    .text-warning{
      color: $secondary !important;
    }
</style>
