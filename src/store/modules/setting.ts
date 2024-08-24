//layout相关配置
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //控制菜单折叠
      refresh: false,//控制刷新
    }
  },
})

export default useLayoutSettingStore