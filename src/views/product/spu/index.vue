<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10.0012px 0">
      <div v-show="scene == 0">
        <el-button type="primary" @click="addSpu" icon="Plus"
          :disabled="categoryStore.c3Id == '' ? true : false">添加SPU</el-button>
        <el-table border style="margin: 10.0012px 0" :data="spuArr">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="SPU操作" align="center">
            <template #="{ row, $index }">
              <el-button type="primary" icon="Plus" size="small" title="添加SKU" @click="addSku(row)"></el-button>
              <el-button type="warning" icon="Edit" size="small" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="info" icon="View" size="small" title="查看SKU" @click="findSku(row)"></el-button>
              <el-popconfirm width="200px" title="确认删除吗" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
          background layout="prev, pager, next, jumper,->, sizes, total" :total="total" @current-change="getSpu"
          @size-change="changeSize" />
      </div>

      <SpuForm ref="spuForm" v-show="scene == 1" @changeScene="changeScene" />

      <SkuForm ref="skuForm" v-show="scene == 2" :scene="scene" @changeScene="changeScene" />

      <el-dialog title="SKU列表" v-model="show">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名称" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU名称">
            <template #="{ row, $index }">
              <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
//@ts-ignore
import useCategoryStore from '@/store/modules/category'
//@ts-ignore
import { reqHasSpu, reqSkuInfo, reqDelSpu } from '@/api/product/spu/index'
//@ts-ignore
import type { skuInfoData, SkuData, HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type'
//@ts-ignore
import SkuForm from './skuForm.vue'
//@ts-ignore
import SpuForm from './spuForm.vue'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
const scene = ref<number>(0)  //0已有spu  1修改添加spu  2添加sku
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const spuArr = ref<Records>([])
const total = ref<number>(0)
const spuForm = ref<any>()
const skuForm = ref<any>()
const show = ref<boolean>(false)
watch(
  () => categoryStore.c3Id,
  (newValue) => {
    if (newValue) {
      getSpu()
    }
  }
)

const getSpu = async (pager = 1) => {
  currentPage.value = pager
  const res: HasSpuResponseData = await reqHasSpu(
    currentPage.value,
    pageSize.value,
    categoryStore.c3Id
  )
  if (res.code === 200) {
    spuArr.value = res.data.records
    total.value = res.data.total
  }
}
const changeSize = (size: number) => {
  pageSize.value = size
  getSpu()
}

const addSpu = () => {
  spuForm.value.initAddSpu(categoryStore.c3Id)
  scene.value = 1
}

const updateSpu = (row: SpuData) => {
  scene.value = 1
  spuForm.value.initHasSpuData(row)
}

const addSku = (row: SpuData) => {
  scene.value = 2
  skuForm.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
const changeScene = (obj: { flag: number; params: string }) => {
  scene.value = obj.flag
  if (obj.params == 'update') {
    getSpu(currentPage.value)
  }
  if (obj.params == 'add') {
    getSpu()
  }
}

let skuArr = ref<SkuData[]>([])
const findSku = async (row: SpuData) => {
  const res: skuInfoData = await reqSkuInfo((row.id as number))
  if (res.code == 200) {
    skuArr.value = res.data
    show.value = true
  }
}

const deleteSpu = async (row: SpuData) => {
  const res: any = await reqDelSpu((row.id as number))
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getSpu(spuArr.value.length > 1 ? currentPage.value : currentPage.value - 1)
  } else {
    ElMessage.warning('删除失败')
  }
}

onBeforeUnmount(() => {
  categoryStore.$reset()
})

</script>
<style scoped lang="scss"></style>