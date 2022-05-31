<template>
  <div>
    <table class="table table-responsive">
      <tbody>
        <tr>
          <td class="status1">
            <i class="fas fa-circle"></i>
            For Approval
          </td>
          <td class="status2">
            <i class="fas fa-circle"></i>
            Confirmed
          </td>
          <td class="status3">
            <i class="fas fa-circle"></i>
            Completed
          </td>
          <td class="status4">
            <i class="fas fa-circle"></i>
            Cancelled
          </td>
          <td class="status5">
            <i class="fas fa-circle"></i>
            Rebooked
          </td>
        </tr>
      </tbody>
    </table>
    <table v-if="data !== null && data.length > 0" class="table table-bordered table-responsive">
      <tbody v-if="data">
        <!-- <tr v-for="(item, index) in data" :key="index" class="table-row"> -->
        <tr v-for="(item, index) in data" :key="index" class="table-row" @click="redirect(item.reservation_code)">
          <td>
            <b><span style="font-size: 14px">{{item.name}} - <span :class="item.status==='for_approval' ? 'status1' : 
              item.status === 'confirmed' ? 'status2' : item.status === 'completed' ? 'status3' : item.status === 'cancelled' ? 'status4' : 'status5'">#{{item.code}}</span></span></b><br/>
            <span style="font-size: 12px">{{item.check_in}}-{{item.check_out}}</span>
          </td>
          <td>
            <div style="text-align:center"><b>Adults</b> <br/>{{item.details.adults}}</div>
          </td>
          <td>
            <div style="text-align:center"><b>Children</b> <br/>{{item.details.child}}</div>
          </td>
          <td style="padding: 20px 0;">
            <div style="text-align:center;horizontal-alignment:center;font-size:16px;font-weight:bold; color:#CBAB58">PHP {{$format.format(item.total)}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['data'],
  methods: {
    redirect(data){
      this.$router.push('/booking-details/' + data)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
  .backAction{
    font-size: 15px;
    cursor: pointer;
  }
  .table{
    border-collapse:separate !important;
    border-spacing:0 15px !important;
    border: none;
  }
  .btn{
    width: 200px;
    height: 50px
  }
  .table-row{
    background-color:white;
  }
  .table-row:hover{
    // cursor: pointer;
    background: rgba(0,0,0, 0.1)
  }
  .table-row:active{
    background-color: white;
  }
  .status1{
    color: $warning
  }
  .status2{
    color: $primary
  }
  .status3{
    color: green
  }
  .status4{
    color: $danger
  }
  .status5{
    color: gray
  }
</style>
