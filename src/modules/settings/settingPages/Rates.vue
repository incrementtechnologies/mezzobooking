<template>
<div style="margin: 56px;">
    <div class="mb-5">
      <span>
          <span @click="$router.push('/settings')" class="backBtn">
              <i class="fas fa-chevron-left"></i>
              Back
          </span>
      </span>
    </div>
    <div class="card cards">
        <div class="row" data-toggle="collapse" data-target="#rate1" @click="toggle1 = !toggle1">
             <div class="col-md-10 column">
                <p>
                    <b>Extra person's rate</b><br>
                   Add or update price of every extra person in a reservation
                </p>
            </div>
            <div class="col-md-2 column">
                <i :class="`fas ${toggle1 ? 'fa-chevron-down' : 'fa-chevron-up'}`"></i>
            </div>
        </div>
        <div id="rate1" class="collapse">
					<div class="d-flex">
            <input type="number" class="form-control form-control-custom"  placeholder="Enter your rate" v-model="person_rate">
						<button class="btn btn-primary" @click="hasPerson ? update('person_rate') : create('person_rate')">Save</button>
					</div>
        </div>
    </div>
		<div class="card cards">
        <div class="row" data-toggle="collapse" data-target="#rate2" @click="toggle2 = !toggle2">
             <div class="col-md-10 column">
                <p>
                    <b>Tax rate</b><br>
                   Add or update price of tax
                </p>
            </div>
            <div class="col-md-2 column">
                <i :class="`fas ${toggle2 ? 'fa-chevron-down' : 'fa-chevron-up'}`"></i>
            </div>
        </div>
        <div id="rate2" class="collapse">
					<div class="d-flex">
            <input type="number" class="form-control form-control-custom"  placeholder="Enter your rate" v-model="tax_rate">
						<button class="btn btn-primary" @click="hasTax ? update('tax_rate') : create('tax_rate')">Save</button>
					</div>
        </div>
    </div>
</div>
</template>

<script>
import AUTH from 'src/services/auth'
export default {
  data: () => ({
    toggle1: false,
    toggle2: false,
    person_rate: 0,
    tax_rate: 0,
    user: AUTH.user,
    hasTax: false,
    hasPerson: false,
    data: []
  }),
  mounted(){
    this.retrieve()
  },
  methods: {
    retrieve(){
      let params = {
        condition: [
          {
            column: 'payload',
            clause: '=',
            value: 'person_rate'
          },
          {
            column: 'payload',
            clause: 'or',
            value: 'tax_rate'
          }
        ]
      }
      this.APIRequest('payloads/retrieve', params, response => {
        this.data = response.data
        if(this.data.length > 0){
          let temp1 = this.data.filter(el => {return el.payload === 'tax_rate'})
          let temp2 = this.data.filter(el => {return el.payload === 'person_rate'})
          if(temp1.length > 0){
            this.tax_rate = temp1[0].payload_value
            this.hasTax = true
          }else{
            this.hasTax = false
          }
          if(temp2.length > 0){
            this.person_rate = temp2[0].payload_value
            this.hasPerson = true
          }else{
            this.hasPerson = false
          }
        }
      })
    },
    create(rate){
      let params = null
      if(rate === 'person_rate'){
        params = {
          payload: 'person_rate',
          payload_value: this.person_rate,
          account_id: this.user.userID
        }
      }else{
        params = {
          payload: 'tax_rate',
          payload_value: this.tax_rate,
          account_id: this.user.userID
        }
      }
      this.APIRequest('room_types/create', params, response => {
        this.retrieve()
      })
    },
    update(rate){
      let params = null
      if(rate === 'person_rate'){
        params = {
          payload_value: this.person_rate
        }
        let temp1 = this.data.filter(el => {return el.payload === 'person_rate'})
        if(temp1.length > 0){
          params['id'] = temp1[0].id
        }
      }else{
        params = {
          payload_value: this.tax_rate
        }
        let temp2 = this.data.filter(el => {return el.payload === 'tax_rate'})
        if(temp2.length > 0){
          params['id'] = temp2[0].id
        }
      }
      this.APIRequest('payloads/update', params, response => {
        this.retrieve()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
     .cards{
      background-color: white;
      margin-top: 3%;
      padding-left: 5%;
      padding-right: 5%;
      border: none;

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
		.form-control-custom{
			height: 45px !important;
		}
		button{
			height: 45px !important;
			margin-bottom: 2%;
		}
</style>
