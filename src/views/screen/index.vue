<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Maps class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Couter class="couter" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
//@ts-ignore
import Top from './components/top/index.vue'
//@ts-ignore
import Tourist from './components/tourist/index.vue'
//@ts-ignore
import Age from './components/age/index.vue'
//@ts-ignore
import Sex from './components/sex/index.vue'
//@ts-ignore
import Maps from './components/map/index.vue'
//@ts-ignore
import Line from './components/line/index.vue'
//@ts-ignore
import Rank from './components/rank/index.vue'
//@ts-ignore
import Year from './components/year/index.vue'
//@ts-ignore
import Couter from './components/couter/index.vue'
const screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScalc()})translate(-50%, -50%)`
})

function getScalc(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

window.onresize = () => {
  screen.value.style.transform = `scale(${getScalc()})translate(-50%, -50%)`
}
</script>
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/screen-bg.png');
  background-size: cover;
}

.screen {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: left top;

  .top {
    width: 100%;
    height: 40px;
  }

  .bottom {
    display: flex;
    width: 100%;

    .left {
      flex: 1;
      height: 1040px;
      display: flex;
      flex-direction: column;

      .tourist {
        flex: 1.5;
      }

      .sex {
        flex: 1;
      }

      .age {
        flex: 1;
      }
    }

    .center {
      flex: 2;
      display: flex;
      flex-direction: column;
      height: 1040px;

      .map{
        flex: 4;
      }
      .line{
        flex: 1;
      }
    }

    .right {
      flex: 1;
      height: 1040px;
      display: flex;
      flex-direction: column;

      .rank {
        flex: 1.5;
      }

      .year {
        flex: 1;
      }

      .couter {
        flex: 1;
      }
    }
  }
}
</style>