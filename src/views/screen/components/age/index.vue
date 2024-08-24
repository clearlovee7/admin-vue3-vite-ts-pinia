<template>
  <div class="age">
    <div class="top">
      <p class="title">年龄比例</p>
      <img class="bg" src="../../../../assets/images/screen_title_tag.png" alt="">
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  let mycharts = echarts.init(charts.value)
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '40',
      right: '80',
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        fontSize: 14
      }
    },
    series: [
      {
        name: '名称',
        type: 'pie',
        radius: ['40%', '70%'],
        center:['40%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '新闻' },
          { value: 580, name: '直播' },
          { value: 484, name: '娱乐' },
          { value: 300, name: '财经' }
        ]
      }
    ],
    grid: {
      top: 0,
      left: '10%',
      right: 0,
      bottom: 0
    }
  }
  mycharts.setOption(option)
})
</script>
<style scoped lang="scss">
.age {
  // margin-left: 10%;
  // width: 90%;
  height: 100%;
  background: url('../../../../assets/images/screen_main_IB.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;

  .top {

    .title {
      color: #ffffff;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
    }
  }


  .charts {
    height: 200px;
  }
}
</style>