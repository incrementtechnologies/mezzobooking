<template>
  <div class="row">
    <div class="col-12 mt-3">
      <div class="card" style="min-height: 150px">
        <div class="card-horizontal">
          <div class="img-square-wrapper">
            <img class="" style="min-height: 150px; width:150px" :src="data.image !== null ? config.BACKEND_URL + data.image : 'http://via.placeholder.com/300x180'" alt="Card image cap">
          </div>
          <div class="card-body">
            <div class="mb-3">
              <span style="float:right">
                <i class="fa fa-pencil ml-2 actionBtn" @click="$router.push('/add-room-types/'+ data.id)"></i>
                <i class="fa fa-trash ml-2 actionBtn" @click="remove(data.id)"></i>
              </span>
              <span><b style="font-size:24px">{{data.payload_value}}</b><br>
                Date Created: {{data.created_at}}
              </span>
            </div>
            <p class="card-text">{{data.category}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CONFIG from 'src/config.js'
export default {
  props: ['data'],
  data(){
    return {
      config: CONFIG
    }
  },
  methods: {
    remove(id){
      this.$parent.delete(id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
  .card-horizontal {
    display: flex;
    flex: 1 1 auto;
    // min-height: 150px;
  }
  .fa-check {
    color: $secondary
  }
  .actionBtn{
    font-size: 20px;
    cursor: pointer;
  }
  .fa-pencil{
    color: $primary
  }
  .fa-trash{
    color: $danger
  }
  .card-text{
    color: gray
  }
</style>

