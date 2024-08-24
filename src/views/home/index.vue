<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" alt="" />
        <div class="bottom">
          <h3>{{ getTime() }}好呀{{ userStore.username }}</h3>
          <p>运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="svg">
      <SvgIcon name="welcome" width="400px" height="400px"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
//@ts-ignore
import useUserStore from '@/store/modules/user'
//@ts-ignore
import { getTime } from '@/utils/time'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
}
.box img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.bottom{
  margin-left: 20px;
}
.bottom h3{
  font-size: 20px;
  margin-bottom: 20px;
}
.bottom p{
  font-size: 15px;
  font-style: italic;
}
.svg{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
</style>