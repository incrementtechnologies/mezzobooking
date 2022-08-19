<template>
    <vc-calendar
    is-expanded
    :attributes='attrs' 
    >
  </vc-calendar>
</template>

<script>
export default {
  components: {
  },
  data(){
    return {
      attrs: [
        {
          key: 'today',
          highlight: {
            color: 'red',
            contentClass: 'text',
            class: 'test'
          },
          dates: new Date(),
          customData: 'test'
        },
      ],
    };
  },
}
</script>

<style>
  .test{
    background-color: blue; 
  }
  .text{
    color: yellow;
  }
  .vc-container {
    --day-content-height : 100px; 
    --day-content-width : 100px;
  }
</style>
