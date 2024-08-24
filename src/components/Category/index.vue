<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" :disabled="scene == 0 ? false : true" v-model="categoryStore.c1Id" @change="getC2">
          <el-option
            v-for="(c1) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" :disabled="scene == 0 ? false : true" v-model="categoryStore.c2Id" @change="getC3">
          <el-option
            v-for="(c2) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" class="lastForm">
        <el-select placeholder="请选择" :disabled="scene == 0 ? false : true" v-model="categoryStore.c3Id">
          <el-option
            v-for="(c3) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
//@ts-ignore
import useCategoryStore from '@/store/modules/category'
import { ref, onMounted } from 'vue'
const categoryStore = useCategoryStore()
defineProps(['scene'])
onMounted(() => {
  getC1()
})

const getC1 = async () => {
  categoryStore.getC1()
}
const getC2 = async () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.getC2()
}

const getC3 = async () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
</script>
<style scoped lang="scss">
.el-form--inline .el-form-item {
  width: 25%;
}
</style>