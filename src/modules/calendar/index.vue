<template>
<div style="position: relative; margin-bottom: 30px">
  <div style="display: flex; justify-content: space-between; margin-bottom: 30px">
    <div style="display: flex; width: 100%">
      <select class="form-control" style="width: 25%" v-model="selectedRoomType" @change="retrieve()">
        <option v-for="item in roomTypes" :key="item.id" :value="item.id">{{item.payload_value}}</option>
      </select>
      <select class="form-control" style="width: 25%" v-model="selectedAddOn"  @change="retrieve()" v-on="checkSelection">
        <option value="With Breakfast">With Breakfast</option>
        <option value="Room Only">Room Only</option>
        <!-- <option value="Breakfast Only">Breakfast Only</option> -->
      </select>
    </div>&nbsp;&nbsp;
    <!-- <button class="btn btn-primary" @click="openPanel()">
      <i class="fas fa-bars"/>
    </button> -->
  </div>
  <div class="text-center section">
    <vc-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
    >
      <div
        slot="day-content"
        v-on="dayEvents"
        slot-scope="{ day, attributes }"
        class="flex flex-col h-full z-10 overflow-hidden box"
        :class="day.year"
        @click="dayClick(day, attributes)"
      >
        <span
          class="day-label text-sm text-gray-900"
          :class="[day.dateTime === today ? 'today rounded-sm' : '' ]"
        >{{ day.day }}</span>
        <div class="flex-grow overflow-y-scroll overflow-x-auto">
          <div
            v-for="attr in attributes"
            :key="attr.key"
            class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1 customData"
            :class="attr.customData.class"
          >
            <p class="limit">{{ attr.customData.limit }} Total</p>
            <p class="price" v-if="attr.customData.limit > 0">PHP {{ attr.customData.price}}</p>
          </div>
        </div>
      </div>
    </vc-calendar>
  </div>
  <div class="sidepanel" id="sidepanel">
    <div class="panelheader" id="panelheader">
      <button class="btn btn-primary closeIcon" @click="closePanel()">
        <i class="fas fa-close" />
      </button>
      <section class="panelBody">
        <p class="text-danger">{{errorMessage}}</p>
        <div class="dates" style="display: flex;">
          <div class="form-group" style="width: 100%">
            <label style="color: white">Start Date:</label>
            <input type="date" class="form-control" v-model="start_date"/>
          </div>
          <div class="form-group" style="width: 100%">
            <label style="color: white">End Date:</label>
            <input type="date" class="form-control" v-model="end_date"/>
          </div>
        </div>
      </section>
    </div>
    <div class="panelContent" id="panelContent">
      <div class="form-group" style="width: 100%">
        <label>Availabilty:</label>
        <input type="number" class="form-control" v-model="available"/>
      </div>
      <!-- <div @click="toggle1 = !toggle1">
        <i :class="`fas ${!toggle1 ? 'fa-toggle-off' : 'fa-toggle-on'} toggle`"/>
      </div> -->
      <div class="form-group" style="width: 100%">
        <label>Cateogry Price (+ tax rate, if enabled):</label>
        <input type="number" class="form-control" v-model="room_price"/>
      </div>
      <!-- <div @click="toggle2 = !toggle2">
        <i :class="`fas ${!toggle2 ? 'fa-toggle-off' : 'fa-toggle-on' } toggle`"/>
      </div> -->
       <div class="form-group" style="width: 100%">
        <label>Breakfast:</label>
        <input type="number" class="form-control" v-model="break_fast" :disabled="disable"/>
      </div>
    </div>
    <div class="panelFooter" id="panelFooter">
      <div style="display:flex; justify-content:space-between">
        <button class="btn btn-secondary" @click="resetData()">Reset</button>
        <button class="btn btn-primary" @click="update()">Update</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: "home",
  mounted(){
    this.retrieve()
    document.getElementById("sidepanel").style.width = "0%";
    document.getElementById("panelheader").style.display = "none";
  },
  data() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const day = now.getDate();
    return {
      roomTypes: [],
      addOns: [],
      availability: null,
      selectedRoomType: null,
      selectedAddOn: null,
      start_date: null,
      end_date: null,
      break_fast: null,
      room_price: null,
      available: 0,
      toggle1: true,
      toggle2: true,
      errorMessage: null,
      selectedDate: null,
      selectedId: null,
      disable: false,
      today: new Date(year, month, day) * 1,
      masks: {
        weekdays: "WWW"
      },
      attributes: [],
      dayEvents: {
        click: a => {
          // eslint-disable-next-line no-console
          console.log("dayEvents:", a);
        }
      },
      checkSelection: {
        change: a => {
          if(this.selectedAddOn == 'Room Only'){
            this.toggle2 = false
            this.disable = true
          }else{
            this.toggle2 = true
            this.disable = false
          }
        }
      }
    };
  },
  methods: {
    dayClick(a, attr) {
      // eslint-disable-next-line no-console
      console.log("origin DOM click", a, attr);
      this.selectedDate = moment(new Date(a.date)).format('YYYY-MM-DD')
      this.selectedId = attr !== undefined && attr.length > 0 ? attr[0].key : null
      this.openPanel()
    },
    openPanel(){
      document.getElementById("sidepanel").style.width = "50%";
      document.getElementById("panelheader").style.display = "block";
      document.getElementById("panelContent").style.display = "block";
      document.getElementById("panelFooter").style.display = "block";
      this.retrieveAvailability();
    },
    closePanel(){
      document.getElementById("sidepanel").style.width = "0%";
      document.getElementById("panelheader").style.display = "none";
      document.getElementById("panelContent").style.display = "none";
      document.getElementById("panelFooter").style.display = "none";
    },
    retrieve(){
      this.attributes = [];
      $('#loading').css({display: 'block'})
      let params = {
        room_type: this.selectedRoomType,
        add_on: this.selectedAddOn
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('room_types/retrieve_with_availability', params, response => {
        $('#loading').css({display: 'none'})
        let temp = response.data
        $('#loading').css({display: 'none'})
        if(temp.room_types.length > 0){
          this.roomTypes = temp.room_types
        }
        if(temp.add_ons.length > 0){
          this.addOns = temp.add_ons
        }
        if(temp.availability.length > 0){
          for (let i = 0; i <=  temp.availability.length-1; i++) {
            const item = temp.availability[i];
            let obj = {
              key: item.id,
              customData: {
                limit: item.limit_per_day,
                price: item.price,
              },
              dates: {start: new Date(item.start_date), end: new Date(item.end_date)}
            } 
            if(item.limit_per_day === 0){
              obj.customData['class'] = 'text-danger'
            }
            this.attributes.push(obj)
          }
          console.log('>>>>>>>>>>>>>', this.attributes);
        }
      })
    },
    retrieveAvailability(){
      let _params = {
        payload: 'room_type',
        payload_value: this.selectedRoomType,
        start_date: this.selectedDate,
        addOn: this.selectedAddOn,
        id: this.selectedId
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('availabilities/retrieve_by_room_type', _params, response => {
        $('#loading').css({display: 'none'})
        if(response.data){
          this.availability = response.data
          this.start_date = moment(new Date(this.selectedDate)).format('YYYY-MM-DD')
          this.end_date = moment(new Date(this.selectedDate)).format('YYYY-MM-DD')
          this.available = this.availability.limit_per_day
          this.room_price = this.availability.description.room_price
          this.break_fast = this.availability.description.break_fast
        }else{
          this.availability = null
          this.start_date = moment(new Date(this.selectedDate)).format('YYYY-MM-DD')
          this.end_date = moment(new Date(this.selectedDate)).format('YYYY-MM-DD')
          this.available = 0
          this.room_price = null
          this.break_fast = null
        }
      })
    },
    update(){
      if(this.start_date == null && this.end_date == null){
        this.errorMessage = 'Dates must no be null'
        return
      }
      if(this.available > 0 && this.available !== null){
        if(this.end_date < this.start_date){
          this.errorMessage = 'Invalid date range'
          return
        }
        if(this.toggle1 && this.room_price == null){
          this.errorMessage = 'Room is enabled, field must not be empty or zero'
          return
        }
        if(this.toggle2 && this.break_fast == null){
          this.errorMessage = 'Break fast is enabled, field  must not be empty of zero'
          return
        }
        if(this.room_price == null && this.break_fast == null){
          this.errorMessage = 'Atleast one price field should have a value'
          return
        }
      }
      let finalPrice = 0
      if(this.toggle1 && this.toggle2){
        finalPrice = parseFloat(this.room_price) + parseFloat(this.break_fast)
      }else if(!this.toggle1 && this.toggle2){
        finalPrice =  parseFloat(this.break_fast)
      }else if(this.toggle1 && !this.toggle2){
        finalPrice = parseFloat(this.room_price)
      }
      let params = {
        payload: 'room_type',
        payload_value: this.selectedRoomType,
        start_date: this.start_date,
        end_date: this.end_date,
        limit_per_day: this.available,
        description: JSON.stringify({
          break_fast: this.break_fast,
          room_price: this.room_price
        }),
        add_on: this.selectedAddOn,
        room_price: finalPrice,
        status: this.available <= 0 ? 'not_available' : 'available'
      }
      // if(this.availability == null){
        this.APIRequest('availabilities/create', params, response => {
          this.errorMessage = null
          this.closePanel()
          this.retrieve()
        })
      // }
    },
    resetData(){
      this.retrieveAvailability()
    },
  }
};
</script>

<style  lang="scss">
@import "~assets/style/colors.scss";

.flex-col {
  flex-direction: column;
}

.flex {
  display: flex;
}
.flex-grow {
  flex-grow: 1;
}
.h-full {
  height: 100%;
}
.bg-red-600 {
  background-color: #e53e3e;
}
// .today {
//   background-color: #d2e1ec;
// }
.bg-teal-500 {
  background-color: #38b2ac;
}
.bg-pink-500 {
  background-color: #ed64a6;
}
.bg-indigo-500 {
  background-color: #667eea;
}
.overflow-y-scroll {
  overflow-y: scroll;
}
.overflow-x-auto {
  overflow-x: auto;
}
.z-10 {
  z-index: 10;
}
.overflow-hidden {
  overflow: hidden;
}
.text-gray-900 {
  color: #1a202c;
}
.vc-h-full {
  height: 100%;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: auto;
}
.custom-calendar.vc-container .vc-weeks {
  padding: 0;
  height: 80vh;
  grid-template-rows: 33px repeat(6, 1fr);
}
.custom-calendar.vc-container .vc-header {
  // background-color: #f1f5f8;
  padding: 10px 0;
}
.custom-calendar.vc-container .vc-weekday {
  background-color: $secondary;
  color: white;
  border-bottom: var(--weekday-border);
  border-top: var(--weekday-border);
  padding: 5px 0;
}
.vc-border {
  border-width: 1px;
}
.custom-calendar.vc-container .vc-day:not(.on-right) {
  border-right: var(--day-border);
}
.custom-calendar.vc-container .vc-day:not(.on-bottom) {
  border-bottom: var(--day-border);
}
.custom-calendar.vc-container .vc-day.weekday-1,
.custom-calendar.vc-container .vc-day.weekday-7 {
  // background-color: #eff8ff;
}
.custom-calendar.vc-container .vc-day {
  padding: 0 5px 3px;
  text-align: right;
  /*min-height: var(--day-height);*/
  min-width: var(--day-width);
  background-color: #fff;
}
.custom-calendar.vc-container .vc-day.is-today{
  background-color:  #d2e1ec !important;
}
.custom-calendar.vc-container .vc-day.in-month:hover{
  background: rgba($color: #000000, $alpha: 0.1);
}
.vc-day {
  position: relative;
  min-height: var(--day-min-height);
  width: 100%;
  height: 100%;
  z-index: 1;
}
.text-center {
  text-align: center;
}
.max-w-full {
  max-width: 100%;
}
.bg-blue-500 {
  background-color: #4299e1;
}
.box{
  cursor: pointer;
}
.text-xs {
  font-size: 0.75rem;
}
.text-white{
  color: #fff;
}

.text-danger p{
  color: $danger;
}
.p-1 {
  padding: 0.25rem;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mt-0 {
  margin-top: 0;
}
.leading-tight {
  line-height: 1.25;
}
.rounded-sm {
  border-radius: 0.125rem;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
.day-label{
  color: $primary
}


.sidepanel{
  height: 1000px;
  // display: flex;
  background-color: white;
  position: absolute;
  z-index: 1;
  top: -20px;
  right: 0;
  width: 0%;
  // padding-top: 200px;
  transition: width 0.5s;
  box-shadow: -5px 0px 2px -2px rgba($color: $secondary, $alpha: 1.0);
  border-right: none;
}

.closeIcon{
  position: relative;
  top: 0;
  border-radius: 30px;
}
.panelheader{
  background-color: $secondary;
  width: 100%;
  height: 200px;
  display: none;
}
.panelBody{
  padding-top: 40px;
  padding-left: 30px;
  padding-right: 30px;
}
.panelContent, .panelFooter{
  padding: 30px;
  display: none;
}
.toggle{
  font-size: 30px;
  float: right
}


.limit{
  color: $primary
}
.price{
  color: $secondary;
  line-height: 0;
}

.limit, .price{
  font-size: 12px;
  text-align: left;
  font-weight: bold;
}
.customData{
  margin-top: 10% !important;
}
</style>
