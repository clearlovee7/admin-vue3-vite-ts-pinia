<template>
  <div class="age">
    <div class="top">
      <p class="title">预约渠道数据统计</p>
      <img class="bg" src="../../../../assets/images/screen_title_tag.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup>
import { ref, onMounted} from 'vue'
import * as echarts from 'echarts'
const list1 = ref([
  { value: 40, name: '大众点评 - 40%' },
  { value: 10, name: '携程 - 10%' },
  { value: 20, name: '飞猪 - 20%' },
  { value: 30, name: '其他平台 - 30%' }
])
const charts = ref()

onMounted(() => {
  let mycharts = echarts.init(charts.value)
  let option ={
    title: {
      text: '100%',
      top: '38%',
      left: 'center',
      textStyle: {
        fontSize: 32,
        color: '#ffffff'
      },
      subtext: '渠道统计',
      subtextStyle: {
        color: 'rgba(223, 245, 252, 1)'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    // 可动态生成颜色集合
    color: [
      'rgba(241, 196, 71, 1)',
      null,
      'rgba(251, 109, 48, 1)',
      null,
      'rgba(239, 61, 119, 1)',
      null,
      '#007AFE',
      null
    ],
    series: [
      {
        name: '项目规模占比',
        type: 'pie',
        radius: ['60%', '70%'],
        label: {
          show: true,
          color: '#fff',
          fontSize: 14
        },
        data: addBlank(list1.value)
      },
      {
        type: 'pie',
        radius: ['75%', '75.5%'],
        label: {
          show: false
        },
        data: addBlank(list1.value)
      }
    ]
  }
  mycharts.setOption(option)
})
const addBlank = (list) => {
  const ret = []
  for (let _list of list) {
    ret.push(_list)
    ret.push({
      name: '',
      value: 1
    })
  }
  return ret
}
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
    height: calc(100% - 30px);
  }
}
</style>