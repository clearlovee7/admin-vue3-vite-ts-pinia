<template>
  <div class="map" ref="map"></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import chinaJSON from './china.json'
const planePath = ref(
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
)
const points = ref([
        { value: [116.405285, 39.904989], itemStyle: { color: '#FFFA00' } },
        { value: [113.54909, 22.198951], itemStyle: { color: '#00EEFF' } },
        { value: [91.132212, 29.660361], itemStyle: { color: '#00EEFF' } },
        { value: [126.642464, 45.756967], itemStyle: { color: '#00EEFF' } },
        { value: [87.617733, 43.792818], itemStyle: { color: '#00EEFF' } },
        { value: [121.472644, 31.231706], itemStyle: { color: '#00EEFF' } },
        { value: [117.283042, 31.86119], itemStyle: { color: '#00EEFF' } }
    ])
const map = ref()
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  const myChart = echarts.init(map.value)
  myChart.setOption({
    geo: {
      map: 'china',
      roam: true,
      top: 150,
      label: {
        show: true,
        color: '#fff'
      },
      itemStyle: {
        areaColor: '#12235c',
        borderColor: '#2ab8ff',
        borderWidth: 0.5,
        shadowColor: 'rgba(0,54,255, 0.4)',
        shadowBlur: 100
        // color: {
        //   type: 'linear',
        //   x: 0,
        //   y: 0,
        //   x2: 0,
        //   y2: 1,
        //   colorStops: [
        //     {
        //       offset: 0,
        //       color: 'red' // 0% 处的颜色
        //     },
        //     {
        //       offset: 1,
        //       color: 'blue' // 100% 处的颜色
        //     }
        //   ],
        //   global: false // 缺省为 false
        // },
        // opacity: 0.78,
        // borderColor: '#fff'
      },
      emphasis: {
        itemStyle: {
          color: '#02102b'
        },
        label: {
          // show: false,
          // fontSize: 18
          color: '#fff'
        }
      }
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989],
              [113.54909, 22.198951]
            ]
          },
          {
            coords: [
              [116.405285, 39.904989],
              [91.132212, 29.660361]
            ]
          },
          {
            coords: [
              [116.405285, 39.904989],
              [126.642464, 45.756967]
            ]
          },
          {
            coords: [
              [116.405285, 39.904989],
              [87.617733, 43.792818]
            ]
          },
          {
            coords: [
              [116.405285, 39.904989],
              [121.472644, 31.231706]
            ]
          },
          {
            coords: [
              [116.405285, 39.904989],
              [117.283042, 31.86119]
            ]
          },
          {
            coords: [
              [113.54909, 22.198951],
              [117.283042, 31.86119]
            ]
          },
          {
            coords: [
              [121.472644, 31.231706],
              [126.642464, 45.756967]
            ]
          }
        ],
        effect: {
          show: true,
          symbol: planePath.value, // 箭头类型,
          // symbol: 'path://M692.8 576v3.2L473.92 960c-11.52 19.84-32.64 32-55.68 32h-90.88l126.08-413.12V576h239.36zM692.8 445.12V448h-239.36v-2.88L327.36 32h90.88c23.04 0 44.16 12.16 55.68 32l218.88 381.12z',
          symbolSize: 10,
          // color: 'pink',
          period: 5, //箭头指向速度，值越小速度越快
          trailLength: 0 //特效尾迹长度[0,1]值越大，尾迹越长重
        },
        lineStyle: {
          color: '#00eaff',
          width: 1, //尾迹线条宽度
          opacity: 0.7, //尾迹线条透明度
          curveness: 0.3 //尾迹线条曲直度
        }
      },
      {
        // 带有涟漪特效动画的散点（气泡）图
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'render',
        zlevel: 1,
        rippleEffect: {
          number: 3, // 波纹的数量。
          period: 5, // 动画的周期，秒数。
          scale: 17, // 动画中波纹的最大缩放比例。
          brushType: 'fill' // 波纹的绘制方式，可选 'stroke' 和 'fill'。
        },
        symbolSize: 2,
        data: points.value
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
.map {
  height: 600px;
}
</style>