<template>
  <!-- ts-ignore -->
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene == 0">
        <el-button
          @click="addAttr"
          type="primary"
          icon="Plus"
          :disabled="categoryStore.c3Id == '' ? true : false"
          >添加属性</el-button
        >
        <el-table border style="margin: 10px 0" :data="attrArr">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="属性名称" width="120" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                icon="Edit"
                size="small"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm title="确定删除吗?" @confirm="deleteAttr(row)">
                <template #reference>
                  <el-button type="danger" icon="Delete" size="small"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          @click="addAttrValue"
          type="primary"
          icon="Plus"
          :disabled="attrParams.attrName == '' ? true : false"
          >添加属性值</el-button
        >
        <el-button @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <!--!ts -->
            <template #="{ row, $index }">
              <el-input
                :ref="(vc:any)=>inputArr[$index] = vc"
                v-if="row.flag == true"
                @blur="toLook(row, $index)"
                size="small"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
            <!-- /ts! -->
          </el-table-column>
          <el-table-column label="属性值操作" width="120" align="center">
            <!--!ts -->
            <template #="{ row, $index }">
              <!-- <el-button type="primary" icon="Edit" size="small"></el-button> -->
              <el-button
                type="danger"
                icon="Delete"
                size="small"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
            <!-- /ts! -->
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
//@ts-ignore
import useCategoryStore from '@/store/modules/category'
import { watch, ref, reactive, nextTick , onBeforeUnmount} from 'vue'
//@ts-ignore
import { reqAttr, reqAddorUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
//@ts-ignore
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
const attrArr = ref<Attr[]>([])
const scene = ref<number>(0)
const attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})
const inputArr = ref<any>([])
watch(
  () => categoryStore.c3Id,
  (newValue) => {
    attrArr.value = []
    if (newValue) {
      getAttr()
    }
  }
)
const getAttr = async () => {
  const res: AttrResponseData = await reqAttr(
    categoryStore.c1Id,
    categoryStore.c2Id,
    categoryStore.c3Id
  )
  if (res.code === 200) attrArr.value = res.data
}

const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3
  })
  scene.value = 1
}
const updateAttr = (row: Attr) => {
  //深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  scene.value = 1
}
const cancel = () => {
  scene.value = 0
}

const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true //控制每一个属性值的切换
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}

const save = async () => {
  const res = await reqAddorUpdateAttr(attrParams)
  if (res.code === 200) {
    //@ts-ignore
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    getAttr()
    scene.value = 0
  } else {
    //@ts-ignore
    ElMessage.error(attrParams.id ? '修改失败' : '添加失败')
  }
}

const toLook = (row: AttrValue, index: number) => {
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice(index, 1)
    ElMessage.warning('属性值不能为空')
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice(index, 1)
    ElMessage.warning('属性值不能重复')
    return
  }
  row.flag = false
}

const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

const deleteAttr= async(row:Attr)=>{
  //@ts-ignore
  const res = await reqDeleteAttr(row.id)
  if(res.code === 200){
    ElMessage.success('删除成功')
    getAttr()
  }else{
    ElMessage.error('删除失败')
  }
}

onBeforeUnmount(()=>{
  categoryStore.$reset()
})
</script>
<style scoped lang="scss">
</style>