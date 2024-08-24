<template>
  <div class="touristComponent">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="text">可预约总量：<span>99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item,index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="bottom" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const charts = ref()
const people = ref('21908人')

onMounted(() => {
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    title: {
      text: ''
    },
    // xAxis: {},
    // yAxis: {},
    series: [
      {
        type: 'liquidFill',
        radius: '90%',
        center:['50%', '50%'],
        waveAnimation: true,
        animationDuration: 0,
        animationDurationUpdate: 0,
        data: [0.6, 0.4, 0.2],
        backgroundStyle: {
          color: 'rgba(0, 0, 0, 0)',
          borderWidth: 1,
        },
        outline: {
          show: true,
          borderDistance: 8,
          itemStyle: {
            color: 'none',
            borderColor: '#294D99',
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.25)'
          }
        },
        label: {
          show: true,
          color: '#294D99',
          insideColor: '#fff',
          fontSize: 50,
          fontWeight: 'bold',
          align: 'center',
          baseline: 'middle'
        }
      }
    ],
    tooltip: {},
    legend: {},
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  })
})
</script>
<style scoped lang="scss">
.touristComponent {
  // margin-left: 10%;
  // width: 90%;
  height: 100%;
  background: url('../../../../assets/images/screen_main_IB.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;

  .top {
    // margin-left: 20px;

    .title {
      color: #ffffff;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url('../../../../assets/images/screen_title_tag.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .text {
      float: right;
      color: #ffffff;
      font-size: 14px;
      margin-top: 10px;
      margin-right: 10px;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    display: flex;
    margin: 0 20px;
    margin-top: 40px;
    font-size: 25px;
    font-weight: bold;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url('../../../../assets/images/screen_tourist_num_bg.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      margin-right: 2px;
    }

    span:last-child {
      margin-right: 0;
    }
  }

  .bottom {
    width: 100%;
    height: 250px;
  }
}
</style>