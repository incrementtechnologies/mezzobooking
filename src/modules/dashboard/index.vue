<template>
  <div class="container">
    <div class="row" style="width: 100%;">
      <div class="column" style="width: 80%;">
        <h3 style="font-weight: 1000">Welcome to Dashboard</h3>
        <!-- <p style="margin-top: 5px;">Here are the latest update of activities as of today in BUsiness Name</p> -->
      </div>
    </div>
    <div class="row" style="width: 100%; margin-top: 40px;">
      <div class="column first">
        <p class="title">Total Sales</p>
        <p class="data"><b>PHP {{data.total_sales}}</b></p>
      </div>
      <div class="column second">
        <p class="title">Reservations(Previous-Current)</p>
        <p class="data"><b>{{data.previous}}</b></p>
      </div>
      <div class="column third">
        <p class="title">Total Bookings(Upcomming)</p>
        <p class="data"><b>{{data.upcomming}}</b></p>
      </div>
    </div>
    <div class="row" style="width: 100%; margin-top: 40px;">
      <div class="column fourth">
        <p class="title">Average Bookings</p>
        <p class="data"><b>{{data.average_bookings}}</b></p>
      </div>
      <div class="column fifth">
        <p class="title">Average Revenue</p>
        <p class="data"><b>PHP {{data.average_revenue}}</b></p>
      </div>
    </div>
    <div class="row" style="width: 100%; margin-top: 40px;">
      <div class="column" style="width: 80%;">
        <h3 style="font-weight: 1000">Latest Bookings</h3>
      </div>
      <div class="column" style="width: 20%;">
        <div style="float: right;">
          <span class="bookings" @click="$router.push('/bookings')">Go to Bookings</span>
        </div>
      </div>
    </div>
    <table class="table table-bordered table-responsive">
      <tbody v-if="bookings.length > 0"> 
        <tr class="table-row" v-for="(item, index) in bookings" :key="index" @click="$router.push('/booking-details/' + item.code)">
          <td>
            <b><span style="font-size: 14px">{{item.email}}-{{item.status}}</span></b><br/>
            <span style="font-size: 12px">{{item.check_in}}-{{item.check_out}}</span>
          </td>
          <td>
            <div style="text-align:center"><b>Adults</b> <br/>{{item.details.adults}}</div>
          </td>
          <td>
            <div style="text-align:center"><b>Children</b> <br/>{{item.details.child}}</div>
          </td>
          <td style="padding: 20px 0;">
            <div style="text-align:center;horizontal-alignment:center;font-size:16px;font-weight:bold; color:#CBAB58">PHP {{item.price}}</div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <p>No Bookings yet</p>
      </tbody>
    </table>
    <div class="row" style="width: 100%; margin-top: 40px;">
      <div class="column" style="width: 80%;">
        <p><b>Summary</b></p>
        <p style="margin-top: 5px;">Here are the summary over the last 30 days</p>
      </div>
      <div class="column" style="width: 20%;">
        <div style="float: right;">
          <span style="margin-right: 10px;">Last 30 days</span>
          <!-- <span><i class="fas fa-chevron-down"></i></span> -->
        </div>
      </div>
    </div>
    <div class="graph">
      <BarGraph :data="datas" v-if="datas.labels.length > 0"/>
    </div>
  </div>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import Posts from 'src/modules/generic/Posts.vue'
import moment from 'moment'
import BarGraph from 'src/modules/generic/BarGraph.vue'
export default{
  mounted(){
    this.retrieve()
    this.retrieveGraph()
    this.retrieveBooking()
  },
  data(){
    return {
      user: AUTH.user,
      data: [],
      bookingLimit: 3,
      bookings: [],
      datas: {
        labels: [],
        datasets: [
          {
            fill: false,
            borderColor: '#003',
            backgroundColor: '#003',
            label: 'RESERVATIONS',
            data: []
          },
          {
            fill: false,
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            label: 'SALES',
            data: []
          }
        ]
      }
    }
  },
  components: {
    Posts,
    BarGraph
  },
  methods: {
    retrieve(){
      let parameter = {}
      $('#loading').css({display: 'block'})
      this.APIRequest('dashboards/retrieve', parameter, response => {
        $('#loading').css({display: 'none'})
        if(response.data !== null){
          this.data = response.data
        }
      })
    },
    retrieveGraph(){
      this.APIRequest('reservations/retrieve_dashboard', {}, response => {
        let tempXaxis = response.data
        for (let index = 0; index <= tempXaxis.length - 1; index++) {
          const element = tempXaxis[index]
          console.log('=============', element.date)
          this.datas.labels.push(element.date)
          this.datas.datasets[0].data.push(element.total_reservations)
          this.datas.datasets[1].data.push(element.total_sales)
        }
      })
    },
    retrieveBooking(){
      let parameter = {
        condition: [{
          value: '%%',
          column: 'created_at',
          clause: 'like'
        }],
        limit: 3,
        offset: 0,
        sort: {
          created_at: 'desc'
        }
      }
      $('#loading').css({'display': 'block'})
      this.APIRequest('reservations/retrieve_bookings', parameter).then(response => {
        $('#loading').css({'display': 'none'})
        if(response.data.length > 0) {
          response.data.forEach(element => {
            element.date_time_at_human = moment(new Date(element.datetime)).format('MMMM Do YYYY, hh:mm a')
          })
          this.bookings = response.data
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "~assets/style/colors.scss";
.container{
  // width: 50%;
  margin-bottom: 50px;
  align-items: center;
  padding: 20px;
}
.title{
  color: white;
  margin: 0;
}
.graph{
  margin-top: 10px;
  background-color: white;
  width: 100%;
  margin-left: -13px;
  padding: 10px 30px 0px 30px;
}
p{
  margin: 0;
}
.data{
  color: white;
  margin: 0;
  font-weight: 500;
  font-size: 180%;
}
.first{
  height: 100px;
  width: 32%;
  background-color: $primary;
  margin-right: 2%;
  padding-top: 25px;
  text-align: center;
  border-radius: 5px;
}
.second{
  height: 100px;
  width: 32%;
  background-color: $danger;
  margin-right: 2%;
  padding-top: 25px;
  text-align: center;
  border-radius: 5px;
}
.third{
  height: 100px;
  width: 32%;
  background-color: $secondary;
  padding-top: 25px;
  text-align: center;
  border-radius: 5px;
}
.fourth{
  height: 100px;
  width: 32%;
  background-color: $gray;
  margin-right: 2%;
  padding-top: 25px;
  text-align: center;
  border-radius: 5px;
}
.fifth{
  height: 100px;
  width: 32%;
  background-color: $warning;
  margin-right: 2%;
  padding-top: 25px;
  text-align: center;
  border-radius: 5px;
}
.bookings{
  margin-right: 10px;
  font-weight:bold;
  color: #CBAB58;
}
.bookings:hover{
  cursor:pointer;
}
.table{
  border-collapse:separate !important;
  border-spacing:0 15px !important;
  border: none;
  margin-left: -20px;
}
.table-row{
  background-color:white;
}
.table-row:hover{
  cursor: pointer;
  background: rgba(0,0,0, 0.1)
}
.table-row:active{
  background-color: white;
}
@media (max-width: 992px){
  .container{
    width: 100%;
  }
}
</style>
