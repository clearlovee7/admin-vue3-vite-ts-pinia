import type{ RouteRecordRaw } from 'vue-router'
import type {Category} from '@/api/product/attr/type'


export interface UserState {
  token: string | null,
  menuRoutes: RouteRecordRaw[],
  username: string,
  avatar: string,
  buttons: string[]
}

export interface CategoryState {
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
  c1Arr: Category[],
  c2Arr: Category[],
  c3Arr: Category[]
}