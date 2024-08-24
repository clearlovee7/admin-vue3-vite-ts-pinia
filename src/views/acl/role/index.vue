<template>
  <div>
    <el-card>
      <el-form class="form" inline>
        <el-form-item label="用户名">
          <el-input v-model="keyword" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="keyword ? false : true" @click="search"
            >搜索</el-button
          >
          <el-button type="primary" @click="reset" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
      <el-table :data="roleList" border style="margin: 10px 0">
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="ID" prop="id" align="center"></el-table-column>
        <el-table-column label="职位名称" prop="roleName" align="center"></el-table-column>
        <el-table-column
          label="创建时间"
          show-overflow-tooltip
          prop="createTime"
          align="center"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          show-overflow-tooltip
          prop="updateTime"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #="{ row, $index }">
            <el-button size="small" icon="User" type="primary" @click="assignRole(row)"
              >分配权限</el-button
            >
            <el-button size="small" icon="Edit" type="primary" @click="updateRole(row)"
              >编辑</el-button
            >
            <el-popconfirm title="确定删除吗?" @confirm="deleteRole(row)">
              <template #reference>
                <el-button size="small" icon="Delete" type="primary">删除</el-button>
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
        @size-change="handleSizeChange"
        @current-change="getRole"
      />
      <el-dialog
        v-model="dialogVisible"
        :title="roleParams.id ? '更新职位' : '添加职位'"
        width="500"
      >
        <el-form ref="ruleFormRef" :rules="rules" :model="roleParams">
          <el-form-item label="职位名称" prop="roleName">
            <el-input v-model="roleParams.roleName"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save"> 确定 </el-button>
          </div>
        </template>
      </el-dialog>

      <el-drawer v-model="assignQX">
        <template #header>
          <h4>分配菜单与按钮的权限</h4>
        </template>
        <template #default>
          <el-tree
            ref="tree"
            :data="menuArr"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="selectArr"
            :props="defaultProps"
          />
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="assignQX = false">取 消</el-button>
            <el-button type="primary" @click="saveassignQX">确 定</el-button>
          </span>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
  reqRole,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermission,
  reqDelRole
  //@ts-ignore
} from '@/api/acl/role/index'
import type {
  Role,
  RoleResponseData,
  AllRole,
  MenuResponseData,
  MenuList
  //@ts-ignore
} from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
//@ts-ignore
import useLayoutSettingStore from '@/store/modules/setting'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const layoutSettingStore = useLayoutSettingStore()
const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const roleList = ref<AllRole>([])
const dialogVisible = ref<boolean>(false)
const keyword = ref<string>('')
const assignQX = ref<boolean>(false)
const selectArr = ref<number[]>([])
const tree = ref<any>()
const roleParams = reactive<Role>({
  roleName: ''
})

onMounted(() => {
  getRole()
})

const getRole = async (pager = 1) => {
  currentPage.value = pager
  const res: RoleResponseData = await reqRole(currentPage.value, pageSize.value, keyword.value)
  if (res.code === 200) {
    roleList.value = res.data.records
    total.value = res.data.total
  } else {
    ElMessage.error('获取角色列表失败')
  }
}

const handleSizeChange = () => {
  currentPage.value = 1
  getRole()
}

const search = () => {
  getRole()
  keyword.value = ''
}
const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const validateroleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 2) {
    callback(new Error('职位名称至少两个字符'))
  } else {
    callback()
  }
}

const rules = reactive({
  roleName: [{ required: true, validator: validateroleName, trigger: 'blur' }]
})

const addRole = () => {
  Object.assign(roleParams, {
    roleName: '',
    id: undefined
  })
  dialogVisible.value = true
  ruleFormRef.value?.clearValidate()
}

const updateRole = (row: Role) => {
  Object.assign(roleParams, row)
  dialogVisible.value = true
  ruleFormRef.value?.clearValidate()
}

const save = async () => {
  await ruleFormRef.value?.validate()
  reqAddOrUpdateRole(roleParams).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(roleParams.id ? '修改成功' : '添加成功')
      dialogVisible.value = false
      getRole(roleParams.id ? currentPage.value : 1)
    } else {
      ElMessage.error(roleParams.id ? '修改失败' : '添加失败')
    }
  })
}

const menuArr = ref<MenuList>([])
const defaultProps = {
  children: 'children',
  label: 'name'
}
const assignRole = (row: Role) => {
  assignQX.value = true
  Object.assign(roleParams, row)
  reqAllMenuList(roleParams.id as number).then((res: MenuResponseData) => {
    if (res.code === 200) {
      menuArr.value = res.data
      selectArr.value = filterSelectArr(res.data, [])
    }
  })
}

const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    //递归
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

const saveassignQX = async () => {
  let arr = tree.value.getCheckedKeys()
  let arr1 = tree.value.getHalfCheckedKeys()
  let permissionId = arr.concat(arr1)

  await reqSetPermission(roleParams.id as number, permissionId).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success('分配权限成功')
      assignQX.value = false
      window.location.reload()
    } else {
      ElMessage.error('分配权限失败')
    }
  })
}

const deleteRole = (row: Role) => {
  reqDelRole(row.id as number).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      getRole(roleList.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
      ElMessage.error('删除失败')
    }
  })
}
</script>
<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>