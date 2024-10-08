import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/types'

let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c2Arr: [],
      c3Arr: [],
      c1Id: '',
      c2Id: '',
      c3Id:''
    }
  },
  getters: {
  },
  actions: {
    async getC1() {
      const res: CategoryResponseData = await reqC1()
      if (res.code === 200) {
        this.c1Arr = res.data
      }
    },
    async getC2() {
      const res: CategoryResponseData = await reqC2(this.c1Id)
      if (res.code === 200) {
        this.c2Arr = res.data
      }
    },

    async getC3() {
      const res: CategoryResponseData = await reqC3(this.c2Id)
      if (res.code === 200) {
        this.c3Arr = res.data
      }
    }


  }
})

export default useCategoryStore