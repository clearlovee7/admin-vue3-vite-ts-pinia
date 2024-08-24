<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input v-model="skuParams.skuName" placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="skuParams.price" placeholder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input v-model="skuParams.weight" placeholder="重量(g)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input v-model="skuParams.skuDesc" placeholder="SKU描述" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline style="width: 100%;">
        <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName
          " style="width: 25%;">
          <el-select placeholder="请选择平台属性" v-model="item.attrIdAndValueId">
            <el-option :value="`${item.id}:${attrValue.id}`" v-for="attrValue in item.attrValueList"
              :label="attrValue.valueName" :key="attrValue.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline style="width: 100%;">
        <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName
          " style="width: 25%;">
          <el-select placeholder="请选择销售属性" v-model="item.saleIdAndValueId">
            <el-option :value="`${item.id}:${saleValue.id}`" v-for="saleValue in item.spuSaleAttrValueList"
              :key="saleValue.id" :label="saleValue.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table ref="table" border :data="imgArr">
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
//@ts-ignore
import { reqAttr } from '@/api/product/attr/index'
//@ts-ignore
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu/index'
//@ts-ignore
import type { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'

let emit = defineEmits(['changeScene'])

const cancel = () => {
  emit('changeScene', { flag: 0, params: '' })
}
let table = ref<any>()
let skuParams = reactive<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: ''

})
let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
  Object.assign(skuParams, {
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
  })
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  const res = await reqAttr(c1Id, c2Id, spu.category3Id)
  attrArr.value = res.data
  const res1 = await reqSpuHasSaleAttr(spu.id)
  saleArr.value = res1.data
  const res2 = await reqSpuImageList(spu.id)
  imgArr.value = res2.data
}

const handler = (row: any) => {
  imgArr.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  });
  table.value.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl
}

const save = async () => {
  //prev是逗号后的空数组，next是当前数组中的每一个元素
  let attrArrs = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId
      })
    }
    return prev
  }, [])
  let saleArrs = saleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId
      })
    }
    return prev
  }, [])
  skuParams.skuAttrValueList = attrArrs
  skuParams.skuSaleAttrValueList = saleArrs

  const res: any = await reqAddSku(skuParams)
  if (res.code == 200) {
    ElMessage.success('添加成功')
    cancel()
  } else {
    ElMessage.warning('添加失败')
  }
}
defineExpose({ initSkuData })
</script>
<style scoped lang="scss">
.el-select {
  width: 240px;
  width: 100%;
}
</style>