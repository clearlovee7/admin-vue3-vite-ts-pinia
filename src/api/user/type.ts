//登录
export interface LoginForm {
  username: string
  password: string
}

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//登录接口返回的数据类型
export interface LoginResponseData extends ResponseData {
  data: string
}

//用户信息
export interface UserInfoResponseData extends ResponseData {
  data: {
    name: string
    avatar: string
    roles: string[]
    buttons: string[]
    routes: string[]
  }
}