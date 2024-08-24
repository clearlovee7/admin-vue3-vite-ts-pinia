<template>
  <el-button size="small" icon="Refresh" circle @click="clickRefresh"></el-button>
  <el-button size="small" icon="FullScreen" circle @click="FullScreen"></el-button>

  <el-popover title="主题设置" :width="200" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" @change="colorChange" :teleported="false" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          @change="darkChange"
          v-model="dark"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
        ></el-switch>
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <img :src="userStore.avatar" alt="" />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
const LayoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
const dark = ref(false)
const color = ref()

function clickRefresh() {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}

function FullScreen() {
  let full = document.fullscreenElement
  if (!full) {
    //全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}

async function loginOut() {
  await userStore.userLoginOut()
  router.push({ path: '/login', query: { redirect: route.path } })
}

function darkChange() {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

function colorChange(val: any) {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>
<script lang="ts">
export default {
  name: 'Setting'
}
</script>
<style scoped lang="scss">
img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 0 10px;
}
</style>