<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0" :data="sKuList">
        <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
        <el-table-column
          label="名称"
          width="150"
          show-overflow-tooltip
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          width="150"
          show-overflow-tooltip
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="默认图片" width="150">
          <template #="{ row, $index }">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="重量" width="150" prop="weight"></el-table-column>
        <el-table-column label="价格" width="150" prop="price"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template #="{ row, $index }">
            <el-button
              @click="updateSale(row)"
              :type="row.isSale == 1 ? 'info' : 'success'"
              size="small"
              :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            ></el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
            <el-button
              type="info"
              size="small"
              icon="InfoFilled"
              @click="openDrawer(row)"
            ></el-button>
            <el-popconfirm title="确定删除吗?" @confirm="deleteSku(row)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="changeSize"
        @current-change="getSkuList"
      />
      <el-drawer v-model="drawer">
        <template #header>
          <h4>查看商品详情</h4>
        </template>
        <template #default>
          <el-row>
            <el-col :span="6">名称</el-col>
            <el-col :span="18">{{ skuInfo.skuName }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">描述</el-col>
            <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">价格</el-col>
            <el-col :span="18">{{ skuInfo.price }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">
              <el-tag style="margin: 5px" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{
                item.valueName
              }}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">
              <el-tag
                style="margin: 5px"
                v-for="item in skuInfo.skuSaleAttrValueList"
                :key="item.id"
              >
                {{ item.saleAttrValueName }}</el-tag
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">商品图片</el-col>
            <el-col :span="18">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                  <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
//@ts-ignore
import {reqSkuList, reqSaleSku, reqCancelSale, reqSkuInfo,reqDelSku} from '@/api/product/sku/index'
//@ts-ignore
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const sKuList = ref<SkuData[]>([])
const total = ref<number>(0)
const drawer = ref<boolean>(false)
const skuInfo = ref<any>({})
onMounted(() => {
  getSkuList()
})
const getSkuList = (pager = 1) => {
  currentPage.value = pager
  reqSkuList(currentPage.value, pageSize.value).then((res: SkuResponseData) => {
    console.log(res)
    if (res.code === 200) {
      total.value = res.data.total
      sKuList.value = res.data.records
    }
  })
}

function changeSize() {
  currentPage.value = 1
  getSkuList()
}

function updateSale(row: SkuData) {
  if (row.isSale == 1) {
    reqCancelSale(row.id as number).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success('下架成功')
        getSkuList(currentPage.value)
      }
    })
  } else {
    reqSaleSku(row.id as number).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success('上架成功')
        getSkuList(currentPage.value)
      }
    })
  }
}

function updateSku() {
  ElMessage.success('程序员在努力更新中···')
}

function openDrawer(row: SkuData) {
  drawer.value = true
  reqSkuInfo(row.id as number).then((res: SkuInfoData) => {
    if (res.code === 200) {
      skuInfo.value = res.data
    }
  })
}

function deleteSku(row: SkuData) {
  reqDelSku(row.id as number).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      getSkuList(sKuList.value.length > 1 ? currentPage.value : currentPage.value - 1)
    }else{
      ElMessage.error('系统数据不能删除')
    }
  })
}
</script>
<style scoped lang="scss">
.el-row {
  margin: 10px 0;
}
</style>