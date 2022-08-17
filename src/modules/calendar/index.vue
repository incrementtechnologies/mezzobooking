<template>
  <vc-calendar :is-expanded="$screens({lg: true })" :attributes="attrs">

  </vc-calendar>
</template>

<script>
export default {
  data(){
    return {
			attrs:[
				{
					highlight: {
						// color: 'purple',
						// fillMode: 'solid',
						// contentClass: 'italic',
						style: {
							backgroundColor: 'brown'
						}
					},
          dates: new Date(),
				}
			]
    }
  }
}
</script>

<style>
</style>
