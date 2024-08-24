<template>
  <div class="sex">
    <div class="top">
      <p class="title">男女比例</p>
      <img class="bg" src="../../../../assets/images/screen_title_tag.png" alt="">
    </div>
    <div class="center">
      <div class="man">
        <img src="../../../../assets/images/screen_man.png" alt="">
      </div>
      <div class="woman">
        <img src="../../../../assets/images/screen_woman.png" alt="">
      </div>
    </div>
    <div class="bottom">
      <p>男士58%</p>
      <p>女士42%</p>
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
  mycharts.setOption({
    title: {
      text: '男女比例',
      textStyle: {
        color: 'skyblue'
      },
      left: '40%'
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skublue',
          borderRadius: 50
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 50
        }
      }
    ],
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
.sex {
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

  .center {
    display: flex;
    justify-content: center;

    .man {
      margin: 20px;
      width: 100px;
      height: 105px;
      background: url('../../../../assets/images/screen_man_bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .woman {
      margin: 20px;
      width: 100px;
      height: 105px;
      background: url('../../../../assets/images/screen_woman_bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }


  .bottom {
    display: flex;
    justify-content: space-between;
    color: #fff;
  }

  .charts {
    height: 100px;
  }
}
</style>