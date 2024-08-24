<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_left" :class="{fold: LayoutSettingStore.fold ? true : false}">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu background-color="#001529" text-color="#fff" :collapse="LayoutSettingStore.fold ? true : false" :default-active="route.path">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_top" :class="{fold: LayoutSettingStore.fold ? true : false}">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容 -->
    <div class="layout_content" :class="{fold: LayoutSettingStore.fold ? true : false}">
      <Main></Main>
    </div>
  </div>
</template>

<script setup>
import Menu from './menu/index.vue'
import Logo from './logo/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
const LayoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const route = useRoute()
</script>
<script>
export default {
  name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_left {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-bg;
    color: #fff;
    transition: all 0.3s;

    .scrollbar{
      height: calc(100vh - $base-menu-logo-height) ;

      .el-menu{
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_top {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    transition: all 0.3s;


    &.fold {
      width: calc(100% - $base-menu-min-width);
      left:  $base-menu-min-width;
    }
  }

  .layout_content {
    overflow: auto;
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    transition: all 0.3s;


    &.fold {
      width: calc(100% - $base-menu-min-width);
      left:  $base-menu-min-width;
    }
  }
}
</style>