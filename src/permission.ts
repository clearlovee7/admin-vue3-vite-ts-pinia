//路由鉴权
import router from '@/router';
//@ts-ignore
import nprogress from 'nprogress'
import pinia from './store';
import setting from './setting';
//获取token
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
nprogress.configure({ showSpinner: false })
//样式可以去源码更改
import 'nprogress/nprogress.css'
//全局守卫
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setting.title + '-' + to.meta.title
  //to 你将要访问哪个路由
  //from 你从哪个路由来
  //next 是一个函数，表示放行
  nprogress.start()
  let token = userStore.token
  let username = userStore.username

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next();
      } else {
        try {
          await userStore.userInfo()
          next({...to});
        } catch (error) {
          //token过期
          await userStore.userLoginOut()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})