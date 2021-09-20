<template>
    <div style="margin: 56px">
      <span>
          <span @click="$router.push('/coupons')" class="backBtn">
              <i class="fa fa-chevron-left"></i>
              Back
          </span>
      </span>
      <span style="float:right">
          <span>
              <b class="actionBtn" @click="create()">Save</b>
          </span>
      </span>
      <section class="mt-5">
        <div class="row">
          <div class="col-md-6">
            <label>Room Type</label>
            <div class="input-group">
                <input v-model="type" type="text" class="form-control-custom form-control">
            </div>
          </div>
          <div class="col-md-6">
            <label>Number Limits</label>
            <div class="input-group">
                <input v-model="limit" type="number" class="form-control-custom form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label>Start Date</label>
            <div class="input-group">
                <input v-model="start_date" type="datetime-local" class="form-control-custom form-control">
            </div>
          </div>
          <div class="col-md-6">
            <label>End Date</label>
            <div class="input-group">
                <input v-model="end_date" type="datetime-local" class="form-control-custom form-control">
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
</script>
<style lang="scss" scoped>
@import "~assets/style/colors.scss";
    .actionBtn{
        color: $secondary
    }
    .actionBtn:hover, .backBtn:hover{
        cursor: pointer;
    }
    .form-control-custom{
        width: 300px !important;
        height: 60px !important;
    }
    label{
        font-weight: bold;
    }
</style>
