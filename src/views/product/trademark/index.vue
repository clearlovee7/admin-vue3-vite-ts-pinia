<template>
  <div>
    <el-card>
      <!-- 卡片顶部添加 -->
      <el-button type="primary" icon="Plus" v-has="`btn.Trademark.add`" @click="addTrademark">添加品牌</el-button>
      <!-- 表格组件 -->
      <el-table style="margin: 10px 0; width: 100%" border :data="trademarkList">
        <el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              v-has="`btn.Trademark.update`"
              type="primary"
              icon="Edit"
              size="small"
              @click="editTrademark(row)"
            ></el-button>
            <el-popconfirm v-has="`btn.Trademark.remove`" width="200" icon="Delete" :title="`确定删除${row.tmName}吗?`" @confirm="deleteTrademark(row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="changePageSize"
      />
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="TrademarkParams.id ? '修改品牌' : '添加品牌'">
      <el-form :rules="rules" :model="TrademarkParams" ref="FormRef" style="width: 80%">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="TrademarkParams.tmName" placeholder="输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="TrademarkParams.logoUrl" :src="TrademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark
  //@ts-ignore
} from '@/api/product/trademark/index'
import { ref, onMounted, reactive, nextTick } from 'vue'
//@ts-ignore
import useUserStore from '@/store/modules/user'
//@ts-ignore
import type { Records, TradeMarkResponseData, Trademark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const userStore = useUserStore()
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const FormRef = ref()
let total = ref<number>(0)
let trademarkList = ref<Records>([])
let dialogFormVisible = ref<boolean>(false)
let TrademarkParams = reactive<Trademark>({
  logoUrl: '',
  tmName: ''
})

onMounted(() => {
  getHasTrademark()
})
const getHasTrademark = async () => {
  const res: TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value)
  if (res.code === 200) {
    total.value = res.data.total
    trademarkList.value = res.data.records
  }
}

const changePageSize = () => {
  currentPage.value = 1
  getHasTrademark()
}

const addTrademark = () => {
  TrademarkParams.id = undefined
  TrademarkParams.tmName = ''
  TrademarkParams.logoUrl = ''
  dialogFormVisible.value = true
  //ts的问号写法
  // FormRef.value?.clearValidate()
  nextTick(() => [FormRef.value.clearValidate()])
}

//@ts-ignore
const editTrademark = (row) => {
  TrademarkParams.id = row.id
  TrademarkParams.tmName = row.tmName
  TrademarkParams.logoUrl = row.logoUrl
  dialogFormVisible.value = true
  nextTick(() => [FormRef.value.clearValidate()])
}

const confirm = async () => {
  await FormRef.value.validate()
  const res: any = await reqAddOrUpdateTrademark(TrademarkParams)
  if (res.code === 200) {
    ElMessage.success(TrademarkParams.id ? '修改成功' : '添加成功')
    dialogFormVisible.value = false
    getHasTrademark()
  } else {
    ElMessage.error(TrademarkParams.id ? '修改失败' : '添加失败')
    dialogFormVisible.value = false
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
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

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  TrademarkParams.logoUrl = response.data
  //图片上传成功清理验证信息
  FormRef.value.clearValidate()
}

const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('品牌名称不能少于两个字符'))
  } else {
    callback()
  }
}

const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请上传品牌LOGO'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof TrademarkParams>>({
  tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
  logoUrl: [{ required: true, validator: validateLogoUrl }]
})

const deleteTrademark = async (id: number) => {
  const res: any = await reqDeleteTrademark(id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getHasTrademark()
  } else {
    ElMessage.error('删除失败')
  }
}
</script>
<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>