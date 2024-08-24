<template>
  <el-form label-width="2.6667rem">
    <el-form-item label="SPU名称">
      <el-input v-model="spuParams.spuName" placeholder="请你输入SPU的名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择品牌" v-model="spuParams.tmId">
        <el-option v-for="(item, index) in tradeMarkList" :key="item.id" :label="item.tmName"
          :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" v-model="spuParams.description" placeholder="请你输入SPU的描述"></el-input>
    </el-form-item>
    <el-form-item label="设置SPU图片">
      <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full style="width: 100%; height: 100%" :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="选择销售属性">
      <el-select v-model="saleListIdAndName" :placeholder="unSelectSaleList.length ? `还未选择${unSelectSaleList.length}个` : '暂无数据可选择'
        ">
        <el-option :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleList" :key="item.id"
          :label="item.name"></el-option>
      </el-select>
      <el-button :disabled="saleListIdAndName ? false : true" style="margin-left: 10px" icon="Plus" type="primary"
        @click="addSale">添加销售属性</el-button>
      <el-table border style="margin: 10px 0" :data="saleList">
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column label="属性名" width="100" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值">
          <template #="{ row, $index }">
            <div class="flex gap-2">
              <el-tag style="margin: 0 5px" v-for="tag in row.spuSaleAttrValueList" :key="tag.id" closable
                @close="row.spuSaleAttrValueList.splice($index, 1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input ref="toLookInput" v-model="row.saleAttrValue" @blur="toLook(row)" placeholder="请你输入属性值"
                size="small" style="width: 100px; margin-left: 5px" v-if="row.flag == true"></el-input>
              <el-button v-else @click="edit(row)" type="primary" size="small" icon="Plus"></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #="{ row, $index }">
            <el-button icon="Delete" type="danger" size="small" @click="saleList.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save" :disabled="saleList.length > 0 ? false : true">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import {
  reqAllTrademark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu
  //@ts-ignore
} from '@/api/product/spu/index'
import type {
  AllSaleAttr,
  SaleAttr,
  SpuImage,
  SpuSale,
  SpuData,
  AllTradeMark,
  SpuImageList,
  SaleAttrResponseData,
  AllSaleAttrResponseData,
  Trademark
  //@ts-ignore
} from '@/api/product/spu/type'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'

let emit = defineEmits(['changeScene'])
const cancel = () => {
  emit('changeScene', { flag: 0, params: spuParams.value.id ? 'update' : 'add' })
}
const saleListIdAndName = ref<string>('')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const toLookInput = ref<any>()
let tradeMarkList = ref<Trademark[]>([])
let imgList = ref<SpuImage[]>([])
let saleList = ref<SaleAttr[]>([])
let allSaleList = ref<AllSaleAttr[]>([])
let spuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: []
})
const initHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu
  const res: AllTradeMark = await reqAllTrademark()
  tradeMarkList.value = res.data
  const res1: SpuImageList = await reqSpuImageList(spu.id as number)
  imgList.value = res1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  const res2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  saleList.value = res2.data
  const res3: AllSaleAttrResponseData = await reqAllSaleAttr()
  allSaleList.value = res3.data
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (file) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const beforeUpload = (file: any) => {
  if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') {
    if (file.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('文件大小需要小于4M')
      return false
    }
  } else {
    ElMessage.error('文件格式只能是jpg/png/gif格式')
    return false
  }
}

//筛选出来未选择的那一个
let unSelectSaleList = computed(() => {
  let unSelectSaleArr = allSaleList.value.filter((item) => {
    return saleList.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectSaleArr
})

const addSale = () => {
  const [baseSaleAttrId, saleAttrName] = saleListIdAndName.value.split(':')
  let newSaleList: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  }
  saleList.value.push(newSaleList)
  saleListIdAndName.value = ''
}

//向数组追加一个判断类型和一个新值
const edit = (row: SaleAttr) => {
  row.flag = true
  row.saleAttrValue = ''
  nextTick(() => {
    toLookInput.value.focus()
  })
}

const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row

  if ((saleAttrValue as string).trim() == '') {
    ElMessage.warning('请输入属性值')
    return
  }

  //判断是否有重复
  let repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage.warning('属性值重复')
    return
  }

  let newSaleAttrValue: SpuSale = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string
  }
  row.spuSaleAttrValueList.push(newSaleAttrValue)
  row.flag = false
}

const save = async () => {
  //照片墙
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url //一个是本地的 一个是上传的
    }
  })
  spuParams.value.spuSaleAttrList = saleList.value

  const res = await reqAddOrUpdateSpu(spuParams.value)
  ElMessage.success(spuParams.value.id ? '修改成功' : '添加成功')
  cancel()
}

const initAddSpu = async (c3Id: number | string) => {
  Object.assign(spuParams.value, {
    spuName: '',
    description: '',
    category3Id: '',
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: [],
    id: undefined
  })
  saleList.value = []
  imgList.value = []
  saleListIdAndName.value = ''

  spuParams.value.category3Id = c3Id
  const res: AllTradeMark = await reqAllTrademark()
  tradeMarkList.value = res.data
  const res3: AllSaleAttrResponseData = await reqAllSaleAttr()
  allSaleList.value = res3.data
}

defineExpose({ initHasSpuData, initAddSpu })
</script>
<style scoped lang="scss">
.el-select {
  width: 20%;
  width: 240px;
}
</style>