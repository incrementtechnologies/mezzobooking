<template>
  <div class="container">
    <div class="row" style="width: 100%;">
      <div class="column" style="width: 80%;">
        <h3>Welcome to your Dashboard!</h3>
        <p style="margin-top: 5px;">Here are the latest update of activities as of today in BUsiness Name</p>
      </div>
    </div>
    <div class="row" style="width: 100%; margin-top: 40px;">
      <div class="column first">
        <p class="title">Total Sales</p>
        <p style="color: white; margin: 0;"><b>PHP {{data.total_sales}}</b></p>
      </div>
      <div class="column second">
        <p class="title">Reservations</p>
        <p style="color: white; margin: 0;"><b>{{data.previous}}</b></p>
      </div>
      <div class="column third">
        <p class="title">Total Bookings</p>
        <p style="color: white; margin: 0;"><b>{{data.upcomming}}</b></p>
      </div>
    </div>
    <div class="row" style="width: 100%; margin-top: 40px;">
      <div class="column fourth">
        <p class="title">Average Bookings</p>
        <p style="color: white; margin: 0;"><b>{{data.average_bookings}}</b></p>
      </div>
      <div class="column fifth">
        <p class="title">Average Revenue</p>
        <p style="color: white; margin: 0;"><b>PHP {{data.average_revenue}}</b></p>
      </div>
    </div>
    <div class="row" style="width: 100%; margin-top: 40px;">
      <div class="column" style="width: 80%;">
        <p><b>Latest Bookings</b></p>
      </div>
      <div class="column" style="width: 20%;">
        <div style="float: right;">
          <span class="bookings">Go to Bookings</span>
        </div>
      </div>
    </div>
    <table class="table table-bordered table-responsive">
      <tbody>
        <tr class="table-row">
          <td>
            <b><span style="font-size: 14px">sample@email.com - pending</span></b><br/>
            <span style="font-size: 12px">August 18, 2021-August 19, 2021</span>
          </td>
          <td>
            <div style="text-align:center"><b>Adults</b> <br/>5</div>
          </td>
          <td>
            <div style="text-align:center"><b>Children</b> <br/>5</div>
          </td>
          <td style="padding: 20px 0;">
            <div style="text-align:center;horizontal-alignment:center;font-size:16px;font-weight:bold; color:#CBAB58">PHP 500</div>
          </td>
        </tr>
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
          <span><i class="fas fa-chevron-down"></i></span>
        </div>
      </div>
    </div>
    <div class="graph">
      <kendo-chart
      :title-text="''"
      :legend-position="'bottom'"
      :tooltip-visible="true"
      :tooltip-template="'$#: value #'"
      :series="series"
      :category-axis-categories="categories"
      :value-axis="valueAxis">
    </kendo-chart>
    </div>
  </div>
</template>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import Posts from 'src/modules/generic/Posts.vue'
import Vue from 'vue'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Chart, ChartInstaller } from '@progress/kendo-charts-vue-wrapper'
import { DataSource, DataSourceInstaller } from '@progress/kendo-datasource-vue-wrapper'
Vue.use(ChartInstaller)
Vue.use(DataSourceInstaller)
export default{
  mounted(){
    this.retrieve()
  },
  data(){
    return {
      user: AUTH.user,
      series: [{
        type: 'line',
        name: 'Name',
        data: [6316.77, 6513.70, 6477.32, 6367.24, 6402.62, 5594.97, 3768.79, 4191.90, 3493.53, 3272.31]
      }],
      categories: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j'
      ],
      valueAxis: [{
        labels: {
          format: `${0}`
        }
      }],
      data: []
    }
  },
  components: {
    Posts,
    Chart,
    DataSource
  },
  methods: {
    retrieve(){
      let parameter = {}
      this.APIRequest('dashboards/retrieve', parameter, response => {
        if(response.data !== null){
          this.data = response.data
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
