import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { UserState } from './types/types'
import type { LoginForm, LoginResponseData, UserInfoResponseData } from "../../api/user/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { contentRouter, asyncRoute, anyRoute } from '@/router/router';
import router from '@/router'
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'
const filterAsyncRoute = (asyncRoutes: any, routes: any) => {
  return asyncRoutes.filter((item: any) => {
      if (routes.includes(item.name)) {
          if (item.children && item.children.length > 0) {
              item.children = filterAsyncRoute(item.children, routes)
          }
          return true
      }
  })
}

let useUserStore = defineStore('User', {

  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: contentRouter, //仓库存储生成菜单需要数组（路由）
      buttons: [],
      username: '',
      avatar: ''
    }

  },
  actions: {
    async userLogin(data: LoginForm) {
      const res: LoginResponseData = await reqLogin(data)
      if (res.code === 200) {
        this.token = (res.data as string)
        SET_TOKEN((res.data as string))
        // location.reload();
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    async userInfo() {
      const res: UserInfoResponseData = await reqUserInfo()
      if (res.code === 200) {
        this.username = res.data.name,
        this.avatar = res.data.avatar
        this.buttons = res.data.buttons
        const useAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), res.data.routes)
        this.menuRoutes = [...contentRouter, ...useAsyncRoute, anyRoute];
        const routes = [...useAsyncRoute, anyRoute]
        routes.forEach((route:any) => {
          router.addRoute(route)
        });
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLoginOut() {
      const res: any = await reqLogout()
      if (res.code === 200) {
        //目前没有mock接口 退出登录接口
        this.token = '',
          this.username = '',
          this.avatar = '',
          REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }

    }
  },
  getters: {

  }
})
export default useUserStore