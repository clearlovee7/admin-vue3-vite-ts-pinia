<template>
  <div class="line">
    <div class="top">
      <p class="title">未来7天游客数据</p>
      <p class="bg"></p>
    </div>
    <div class="echarts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  const myChart = echarts.init(charts.value)
  const option = {
    title: {
      text: '访问量'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      axisTick: {
        show: true
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    series: [
      {
        type: 'line',
        data: [120, 2020, 99, 3000, 310, 1995, 600],
        smooth: true,
        lineStyle: {
          normal: {
            width: 2,
            color: 'rgba(25,163,223,1)' // 线条颜色
          },
          borderColor: 'rgba(0,0,0,.4)'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(25,163,223,.3)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(25,163,223, 0)' // 100% 处的颜色
              }
            ],
            global: false, // 缺省为 false
            shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        itemStyle: {
          color: 'rgba(25,163,223,1)',
          borderColor: '#646ace',
          borderWidth: 2
        }
      }
    ],
    grid: {
      left: 40,
      right: 10,
      bottom: 20,
      top: 20
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'transparent',
      axisPointer: {
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(126,199,255,0)' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(126,199,255,1)' // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(126,199,255,0)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    }
  }
  myChart.setOption(option)
})
</script>
<style scoped lang="scss">
.line {
  background: url('../../../../assets/images/screen_main_IB.png') no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;

  .top {
    .title {
      color: #ffffff;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url('../../../../assets/images/screen_title_tag.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .echarts {
    height: calc(100% - 40px);
  }
}
</style>