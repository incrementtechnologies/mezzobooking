<template>
    <div style="margin: 56px">
      <span>
          <span @click="$router.push('/add-rooms/' + $route.params.id)" class="backBtn">
              <i class="fas fa-chevron-left"></i>
              Back
          </span>
      </span>
      <span style="float:right">
          <span>
              <b class="actionBtn" @click="update()">Save</b>
          </span>
      </span>
      <section class="mt-5">
        <div style="padding-left:2%; padding-right:2%;">
          <div class="row cards">
              <div class="col-md-10 column">
                  <p>
                  <b>Availability</b><br>
                  By switching on, you allow the availability of this room
                  </p>
              </div>
              <div class="col-md-2 column">
                  <i class="fas fa-toggle-on" v-if="isSwitch === true" @click="isSwitch = false"></i>
                  <i class="fas fa-toggle-off" v-else @click="isSwitch = true"></i>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label>Start Date</label>
            <div class="input-group">
                <input v-model="start_date" type="date" class="form-control-custom form-control">
            </div>
          </div>
          <div class="col-md-6">
            <label>End Date</label>
            <div class="input-group">
                <input v-model="end_date" type="date" class="form-control-custom form-control">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <label>Description</label>
            <div class="input-group">
                <textarea v-model="description" class="form-control-custom form-control" style="height: 165px !important;"></textarea>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
export default {
  mounted(){
    if(this.$route.params.status === 'publish'){
      this.isSwitch = true
    }else{
      this.isSwitch = false
    }
    this.retrieveById()
  },
  data(){
    return {
      isSwitch: false,
      description: null,
      start_date: null,
      end_date: null,
      data: null
    }
  },
  methods: {
    retrieveById(){
      let parameter = {
        condition: [{
          column: 'payload',
          value: 'room_id',
          clause: '='
        }, {
          column: 'payload_value',
          value: this.$route.params.id,
          clause: '='
        }]
      }
      this.APIRequest('availabilities/retrieve_by_id', parameter).then(response => {
        if(response.data.length > 0){
          this.data = response.data[0]
          this.description = response.data[0].description
          this.start_date = response.data[0].start_date
          this.end_date = response.data[0].end_date
        }
      })
    },
    update(){
      let parameter = {
        id: this.data.id,
        payload: 'room_id',
        payload_value: this.$route.params.id,
        start_date: this.start_date,
        end_date: this.end_date,
        limit: null,
        description: this.description,
        status: this.isSwitch === true ? 'available' : 'not_available'
      }
      console.log('[update]', parameter)
      this.APIRequest('availabilities/update', parameter).then(response => {
        console.log('[update]', response)
        if(response.data > 0){
          this.$router.push('/add-rooms/' + this.$route.params.id)
        }
      })
    }
  }
}
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
    .cards{
    height: 100px;
    background-color: white;
    margin-bottom: 3%;
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
    color: '#C84848';
    font-size: 30px
  }
</style>
