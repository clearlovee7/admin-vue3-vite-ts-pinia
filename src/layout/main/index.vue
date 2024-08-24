<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup>
import { watch, ref ,nextTick} from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
const LayoutSettingStore = useLayoutSettingStore()

let flag = ref(true)

watch(() => LayoutSettingStore.refresh,() => {
    flag.value = false,
    nextTick(()=>{
      flag.value = true
    })
  }
)
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-leave-to {
  opacity: 1;
  transform: scale(1);
}
</style>