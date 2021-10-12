<template>
  <div class="content-holder">
    <transition >
      <router-view ></router-view>
    </transition>
  </div>
</template>
<style scoped>
  .content-holder{
    /* background-color: #000033; */
    width: 100%;
    min-height: 400px;
    float: left;
    padding-top: 3%;
    overflow: hidden;
  }/*-- content-holder --*/
</style>
