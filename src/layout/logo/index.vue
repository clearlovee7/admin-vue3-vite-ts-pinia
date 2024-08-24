<template>
<div class="logo"> 
   <img :src="setting.logo" alt="">
    <p>{{setting.title}}</p>
</div>
</template>

<script setup lang="ts">
import setting from '../../setting'
</script>
<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<style scoped lang="scss">
.logo{
  display: flex;
  align-items: center;
  width: 100%;
  height: $base-menu-logo-height;
  padding: 20px;
  padding-left: 10px;

  img{
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  p{
    color: #fff;
    font-size: $base-menu-logo-font-size;
    margin-left: 10px;
    flex-shrink: 0;
  }
}
</style>