<template>
  <stripe-element
    ref='element'
    type='postalCode'
    :stripe='stripe'
    :value='value'
    :options='options'
    @blur='$emit("blur")'
    @focus='$emit("focus")'
    @empty='$emit("empty")'
    @change='$emit("change", $event)'
  />
  
</template>

<script>
import props from './props'
import StripeElement from './StripeElement'

export default {
  props,
  components: { StripeElement },
  methods: {
    blur () { this.$refs.element.blur() },
    clear () { this.$refs.element.clear() },
    focus () { this.$refs.element.focus() },
    update (options) { this.$refs.element.update(options) }
  }
}
</script>
