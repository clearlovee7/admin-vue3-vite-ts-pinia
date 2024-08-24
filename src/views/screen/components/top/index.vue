<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="rtime">时间：{{ data }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

const router = useRouter()
const data = ref(moment().format('YYYY年MM月DD日 HH:mm:ss'))
const timer = ref(0)

onMounted(() => {
  timer.value = setInterval(() => {
    data.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})
function goHome() {
  router.push({
    path: '/home'
  })
}

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>
<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1;
    background: url('../../../../assets/images/screen_header_bg.png') no-repeat;
    background-size: cover;

    .lbtn {
      width: 100px;
      height: 40px;
      float: right;
      background: url('../../../../assets/images/screen_header_left.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
  }
  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      background: url('../../../../assets/images/screen_header_center.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      font-size: 30px;
      color: #29fcff;
    }
  }
  .right {
    flex: 1;
    display: flex;
    background: url('../../../../assets/images/screen_header_bg.png') no-repeat;
    background-size: 100% 100%;
    justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 100px;
      height: 40px;
      background: url('../../../../assets/images/screen_header_right.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
    }
    .rtime {
      color: #29fcff;
      margin-right: 10px;
    }
  }
}
</style>