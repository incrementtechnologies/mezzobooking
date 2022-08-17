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
            <input class="form-control form-control-custom"  placeholder="Enter your rate" v-model="extra">
						<button class="btn btn-primary">Save</button>
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
            <input class="form-control form-control-custom"  placeholder="Enter your rate" v-model="tax">
						<button class="btn btn-primary">Save</button>
					</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data: () => ({
    toggle1: false,
    toggle2: false
  })
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
