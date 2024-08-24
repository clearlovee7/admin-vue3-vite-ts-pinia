<template>
  <div>
    <el-table :data="permissionList" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button
            size="small"
            type="primary"
            @click="addPermission(row)"
            :disabled="row.level === 4 ? true : false"
            >{{ row.level === 3 ? '添加功能' : '添加菜单' }}</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="updatePermission(row)"
            :disabled="row.level === 1 ? true : false"
            >编辑</el-button
          >
          <el-popconfirm title="确定删除吗?" @confirm="deletePermission(row)">
            <template #reference>
              <el-button size="small" type="primary" :disabled="row.level === 1 ? true : false"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="permission.id ? '更新菜单' : '添加菜单'" width="500">
      <el-form label-width="70px">
        <el-form-item label="名称">
          <el-input v-model="permission.name" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="permission.code" placeholder="菜单权限值"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqAllPermission,
  reqAddOrUpdatePermission,
  reqDeletePermission
  //@ts-ignore
} from '@/api/acl/permission/index'
import type {
  PermissionResponseData,
  PermissionList,
  menuParams,
  Permission
  //@ts-ignore
} from '@/api/acl/permission/type'
import { ElMessage } from 'element-plus'
import { id } from 'element-plus/es/locales.mjs'

const permissionList = ref<PermissionList>([])
const dialogVisible = ref(false)
const permission = reactive<menuParams>({
  name: '',
  code: '',
  level: 0,
  pid: 0
})

onMounted(() => {
  getPermissionList()
})
function getPermissionList() {
  reqAllPermission().then((res: PermissionResponseData) => {
    if (res.code === 200) {
      permissionList.value = res.data
    }
  })
}
function addPermission(row: Permission) {
  Object.assign(permission, { name: '', code: '', level: 0, pid: 0, id: 0 })
  permission.level = (row.level as number) + 1
  permission.pid = row.id as number
  dialogVisible.value = true
}
function updatePermission(row: Permission) {
  Object.assign(permission, row)
  dialogVisible.value = true
}

function save() {
  reqAddOrUpdatePermission(permission).then((res: PermissionResponseData) => {
    if (res.code === 200) {
      dialogVisible.value = false
      getPermissionList()
      ElMessage.success(permission.id ? '修改成功' : '添加成功')
    }
  })
}

function deletePermission(row: Permission) {
  reqDeletePermission(row.id as number).then((res: PermissionResponseData) => {
    if (res.code === 200) {
      getPermissionList()
      ElMessage.success('删除成功')
    } else {
      ElMessage.error('删除失败')
    }
  })
}
</script>

<style scoped lang="scss">
</style>