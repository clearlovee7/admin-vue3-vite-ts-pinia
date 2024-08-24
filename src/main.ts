import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
//暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from '@/App.vue'
import 'virtual:svg-icons-register'
import GloalComponent from '@/components'
import router from '@/router/index'
import pinia from './store/index'
import '@/styles/index.scss'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(GloalComponent)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
import './permission'
import { isHasButton } from './directive/has'
isHasButton(app)
app.mount('#app')
