<template>
  <div class="rank">
    <div class="top">
      <p class="title">热门景区排行</p>
      <img class="bg" src="../../../../assets/images/screen_title_tag.png" alt="" />
    </div>
    <div class="charts" ref="charts" v-show="ranks"></div>

    <div class="charts" ref="charts1" v-show="!ranks"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
const ranks = ref(false)
const charts = ref()
const charts1 = ref()
const datas = ref([
  { name: '峨眉山', percent: '30', total: '10000', finished: '3.00w' },
  { name: '稻城亚丁', percent: '40', total: '10000', finished: '4.00w' },
  { name: '九寨沟', percent: '50', total: '25000', finished: '5.00w' },
  { name: '万里长城', percent: '50', total: '30000', finished: '6.00w' },
  { name: '北京故宫', percent: '80', total: '64000', finished: '8.00w' }
])
onMounted(() => {
  if (ranks.value) {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
      title: {
        text: '景区排行',
        left: '50%',
        textStyle: {
          color: 'skyblue',
          fontSize: 20
        },
        subtext: '各大景区排行',
        subtextStyle: {
          color: 'skyblue',
          fontSize: 16
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {},
      grid: {
        top: 60,
        left: 20,
        right: 20,
        bottom: 20
      },
      series: [
        {
          type: 'bar',
          data: [10, 20, 30, 40, 50, 60, 70],
          label: {
            show: true,
            position: 'top',
            color: 'skyblue'
          },
          showBackground: true,
          backgroundStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'black'
                },
                {
                  offset: 1,
                  color: 'blue'
                }
              ],
              global: false
            }
          },
          itemStyle: {
            borderRadius: [10, 10, 0, 0],
            color: function (data: any) {
              let arr = ['red', 'orange', 'yellow', 'green', 'pink', 'blue', 'purple']
              return arr[data.dataIndex]
            }
          }
        },
        {
          type: 'line',
          data: [10, 20, 30, 40, 50, 60, 90],
          smooth: true
        }
      ],
      tooltip: {}
    })
  }
  if (!ranks.value) {
    const yData = datas.value.map((item) => item.name)
    const zData = datas.value.map((item) => item.finished)
    const pData = datas.value.map((item) => item.percent)
    // 设置等长的背景柱状图
    const maxData = new Array(yData.length).fill(100)
    let mycharts1 = echarts.init(charts1.value)
    nextTick(() => {
      mycharts1.setOption({
        grid: {
          left: '26%',
          right: '20%',
          bottom: '4%',
          top: '10%',
          containLabel: false
        },
        xAxis: [
          {
            show: true
          },
          {
            show: false,
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            show: true,
            data: yData,
            offset: 40,
            position: 'left',
            axisLabel: {
              // 景区名称
              lineHeight: 0,
              fontSize: 14,
              color: '#fff',
              formatter: '{value}',
              align: 'center'
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            show: true,
            data: zData,
            offset: 30,
            position: 'right',
            axisLabel: {
              lineHeight: 0,
              verticalAlign: 'bottom',
              fontSize: 14,
              color: '#fff',
              formatter: '{value}',
              align: 'center'
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '进度',
            show: true,
            type: 'bar',
            barGap: '-100%',
            xAxisIndex: 1,
            barWidth: 12,
            itemStyle: {
              borderRadius: 30,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0A7782' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#81EFF3' // 0% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            label: {
              show: true,
              position: 'insideRight',
              formatter: '{c}%',
              offset: [-10, 2],
              color: '#fff',
              fontSize: 12
            },
            labelLine: {
              show: false
            },
            z: 2,
            data: pData,
            animationDelay: 1000,
            animationDuration: 1000
          },
          {
            name: '百分比',
            z: 1,
            show: true,
            type: 'bar',
            xAxisIndex: 1,
            barGap: '-100%',
            barWidth: 12,
            itemStyle: {
              borderRadius: 30,
              color: 'rgba(13, 55, 78, .5)'
            },
            label: {
              show: false
            },
            data: maxData
          }
        ]
      })
    })
  }
})


</script>
<style scoped lang="scss">
.rank {
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
    height: calc(100% - 30px);
  }
}
</style>