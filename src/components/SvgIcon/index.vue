<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>


<script setup>
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: String,
  color: String,
  width: {
    type: String,
    default: '30px'
  },
  height: {
    type: String,
    default: '30px'
  }
})
</script>


<style scoped>
</style>