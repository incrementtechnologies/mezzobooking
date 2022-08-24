<template>
<div style="position: relative; margin-bottom: 30px">
  <div style="display: flex; justify-content: space-between; margin-bottom: 30px">
    <div style="display: flex; width: 100%">
      <select class="form-control" style="width: 25%">
        <option v-for="item in roomTypes" :key="item.id">{{item.payload_value}}</option>
      </select>
      <select class="form-control" style="width: 25%">
        <option v-for="item in addOns" :key="item.id">{{item.title}}</option>
      </select>
    </div>&nbsp;&nbsp;
    <button class="btn btn-primary" @click="openPanel()">
      <i class="fas fa-bars"/>
    </button>
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
        @click="dayClick"
        slot-scope="{ day, attributes }"
        class="flex flex-col h-full z-10 overflow-hidden"
        :class="day.year"
      >
        <span
          class="day-label text-sm text-gray-900"
          :class="[day.dateTime === today ? 'today rounded-sm' : '' ]"
        >{{ day.day }}</span>
        <div class="flex-grow overflow-y-scroll overflow-x-auto">
          <p
            v-for="attr in attributes"
            :key="attr.key"
            class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
            :class="attr.customData.class"
          >{{ attr.customData.title }}</p>
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
        <div class="dates" style="display: flex;">
          <div class="form-group" style="width: 100%">
            <label style="color: white">Start Date:</label>
            <input type="date" class="form-control"/>
          </div>
          <div class="form-group" style="width: 100%">
            <label style="color: white">End Date:</label>
            <input type="date" class="form-control"/>
          </div>
        </div>
      </section>
    </div>
    <div class="panelContent" id="panelContent">
      <div class="form-group" style="width: 100%">
        <label>Availabilty:</label>
        <input type="number" class="form-control"/>
      </div>
      <div @click="toggle1 = !toggle1">
        <i :class="`fas ${toggle1 ? 'fa-toggle-off' : 'fa-toggle-on'} toggle`"/>
      </div>
      <div class="form-group" style="width: 100%">
        <label>Room Only:</label>
        <input type="number" class="form-control"/>
      </div>
      <div @click="toggle2 = !toggle2">
        <i :class="`fas ${toggle2 ? 'fa-toggle-off' : 'fa-toggle-on' } toggle`"/>
      </div>
       <div class="form-group" style="width: 100%">
        <label>Breakfast:</label>
        <input type="number" class="form-control"/>
      </div>
    </div>
    <div class="panelFooter" id="panelFooter">
      <div style="display:flex; justify-content:space-between">
        <button class="btn btn-secondary">Reset</button>
        <button class="btn btn-primary">Update</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Input from '../../components/increment/generic/form/Input.vue';
import Label from '../../components/increment/imarketvue/installment/label.vue';
export default {
  components: { Input, Label },
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
      toggle1: false,
      toggle2: false,
      today: new Date(year, month, day) * 1,
      masks: {
        weekdays: "WWW"
      },
      attributes: [
        {
          key: 1,
          customData: {
            title: "Lunch with mom.",
            class: "bg-red-600 text-white"
          },
          dates: new Date(year, month, 1)
        },
        {
          key: 2,
          customData: {
            title: "Take Noah to basketball practice",
            class: "bg-blue-500 text-white"
          },
          dates: new Date(year, month, 2)
        },
        {
          key: 3,
          customData: {
            title: "Noah's basketball game.",
            class: "bg-blue-500 text-white"
          },
          dates: new Date(year, month, 5)
        },
        {
          key: 4,
          customData: {
            title: "Take car to the shop",
            class: "bg-indigo-500 text-white"
          },
          dates: new Date(year, month, 5)
        },
        {
          key: 4,
          customData: {
            title: "Meeting with new client.",
            class: "bg-teal-500 text-white"
          },
          dates: new Date(year, month, 7)
        },
        {
          key: 5,
          customData: {
            title: "Mia's gymnastics practice.",
            class: "bg-pink-500 text-white"
          },
          dates: new Date(year, month, 11)
        },
        {
          key: 6,
          customData: {
            title: "Cookout with friends.",
            class: "bg-orange-500 text-white"
          },
          dates: { months: 5, ordinalWeekdays: { 2: 1 } }
        },
        {
          key: 7,
          customData: {
            title: "Mia's gymnastics recital.",
            class: "bg-pink-500 text-white"
          },
          dates: new Date(year, month, 22)
        },
        {
          key: 8,
          customData: {
            title: "Visit great grandma.",
            class: "bg-red-600 text-white"
          },
          dates: new Date(year, month, 25)
        },
        {
          key: "today",
          customData: {
            title: "Visit great grandma.",
            class: "bg-red-600 text-white"
          },
          dates: new Date()
        }
      ],
      dayEvents: {
        click: a => {
          // eslint-disable-next-line no-console
          console.log("dayEvents:", a);
        }
      }
    };
  },
  methods: {
    dayClick(a) {
      // eslint-disable-next-line no-console
      console.log("origin DOM click", a);
    },
    openPanel(){
      document.getElementById("sidepanel").style.width = "50%";
      document.getElementById("panelheader").style.display = "block";
      document.getElementById("panelContent").style.display = "block";
      document.getElementById("panelFooter").style.display = "block";
    },
    closePanel(){
      document.getElementById("sidepanel").style.width = "0%";
      document.getElementById("panelheader").style.display = "none";
      document.getElementById("panelContent").style.display = "none";
      document.getElementById("panelFooter").style.display = "none";
    },
    retrieve(){
      $('#loading').css({display: 'block'})
      this.APIRequest('room_types/retrieve_with_availability', {}, response => {
        let temp = response.data[0]
        $('#loading').css({display: 'none'})
        if(temp.room_types.length > 0){
          this.roomTypes = temp.room_types
        }
        if(temp.add_ons.length > 0){
          this.addOns = temp.add_ons
        }
      })
    }
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
.today {
  background-color: #d2e1ec;
}
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
  background-color: #f1f5f8;
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
  background-color: #eff8ff;
}

.custom-calendar.vc-container .vc-day {
  padding: 0 5px 3px;
  text-align: right;
  /*min-height: var(--day-height);*/
  min-width: var(--day-width);
  background-color: #fff;

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

.text-xs {
  font-size: 0.75rem;
}
.text-white {
  color: #fff;
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
  height: 100vh;
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
</style>
