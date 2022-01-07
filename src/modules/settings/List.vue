<template>
    <div style="margin: 56px;">
        <b>Settings</b>
        <div class="row cards" v-for="(menu, idx) in common.settingsTabMenu" :key="idx" @click="redirect(menu.route)">
            <div class="col-md-10 column">
                <p>
                  <b>{{menu.title}}</b><br>
                  {{menu.description}}
                </p>
            </div>
            <div class="col-md-2 column">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import COMMON from 'src/common.js'
export default {
  data(){
    return {
      common: COMMON
    }
  },
  methods: {
    redirect(route){
      this.$router.push(route)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/style/colors.scss";
    .cards{
      height: 100px;
      background-color: white;
      margin-top: 3%;
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
</style>
