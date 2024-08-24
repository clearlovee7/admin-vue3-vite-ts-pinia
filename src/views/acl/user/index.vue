<template>
  <div>
    <el-card style="height: 80px">
      <el-form inline class="form">
        <el-form-item label="用户名">
          <el-input v-model="keyword" type="text" placeholder=""></el-input>
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
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="danger" @click="delUser" :disabled="selectIdArr.length >= 1 ? false : true"
        >批量删除</el-button
      >
      <el-table
        @selection-change="selectChange"
        style="width: 100%; margin: 10px 0"
        border
        :data="userList"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" type="index"></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用户名字"
          show-overflow-tooltip
          align="center"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="用户名称"
          show-overflow-tooltip
          align="center"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          show-overflow-tooltip
          align="center"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          show-overflow-tooltip
          align="center"
          prop="createTime"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          show-overflow-tooltip
          align="center"
          prop="updateTime"
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" icon="User" size="small" @click="assignRole(row)"
              >分配角色</el-button
            >
            <el-button type="primary" icon="Edit" size="small" @click="editUser(row)"
              >编辑</el-button
            >
            <el-popconfirm title="确定删除吗?" @confirm="deleteUser(row)">
              <template #reference>
                <el-button type="primary" icon="Delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getUser"
      />
      <el-drawer v-model="drawer">
        <template #header>
          <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <template #default>
          <el-form :model="userParams" :rules="rules" ref="ruleFormRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input v-model="userParams.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input v-model="userParams.name" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-show="!userParams.id">
              <el-input v-model="userParams.password" placeholder="请输入用户密码"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="drawer = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </template>
      </el-drawer>

      <el-drawer v-model="toRole">
        <template #header>
          <h4>分配角色</h4>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input v-model="userParams.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="职位列表">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group v-model="checkedRole" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="role in allRoles" :key="role" :label="role" :value="role">
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="toRole = false">取 消</el-button>
            <el-button type="primary" @click="saveToRole">确 定</el-button>
          </span>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqUser,
  reqAddOrUpdateUser,
  reqAllRole,
  reqAssignRole,
  reqDelUser,
  reqDelAllUser
  //@ts-ignore
} from '@/api/acl/user/index'
import { ElMessage } from 'element-plus'
import type {
  UserResponseData,
  User,
  RoleResponseData,
  AllRole,
  Role,
  AssignRoleData
  //@ts-ignore
} from '@/api/acl/user/type'
import type { FormInstance } from 'element-plus'
//@ts-ignore
import useLayoutSettingStore from '@/store/modules/setting'

const layoutSettingStore = useLayoutSettingStore()
const ruleFormRef = ref<FormInstance>()
const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const userList = ref<User[]>([])
const drawer = ref<boolean>(false)
const toRole = ref<boolean>(false)
const selectIdArr = ref<number[]>([])
const keyword = ref<string>('')
const userParams = reactive<User>({
  username: '',
  password: '',
  name: ''
})

onMounted(() => {
  getUser()
})

function getUser(pager = 1) {
  currentPage.value = pager
  reqUser(currentPage.value, pageSize.value, keyword.value).then((res: UserResponseData) => {
    if (res.code === 200) {
      userList.value = res.data.records
      total.value = res.data.total
    } else {
      ElMessage.error('获取用户列表失败')
    }
  })
}
function handleSizeChange() {
  currentPage.value = 1
  getUser()
}
function addUser() {
  Object.assign(userParams, {
    username: '',
    password: '',
    name: '',
    id: undefined
  })
  ruleFormRef.value?.clearValidate()
  drawer.value = true
}
function editUser(row: User) {
  drawer.value = true
  Object.assign(userParams, row)

  nextTick(() => {
    ruleFormRef.value?.clearValidate()
  })
}

const validateusername = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 5) {
    callback(new Error('用户姓名不能少于五位'))
  } else {
    callback()
  }
}
const validatepassword = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 6) {
    callback(new Error('用户密码不能少于六位'))
  } else {
    callback()
  }
}
const validateroleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length < 5) {
    callback(new Error('用户昵称不能少于五位'))
  } else {
    callback()
  }
}

const rules = {
  username: [{ required: true, trigger: 'blur', validator: validateusername }],
  password: [{ validator: validatepassword, trigger: 'blur', required: true }],
  name: [{ validator: validateroleName, trigger: 'blur', required: true }]
}

async function save() {
  await ruleFormRef.value?.validate()
  reqAddOrUpdateUser(userParams).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success(userParams.id ? '修改成功' : '添加成功')
      drawer.value = false
      window.location.reload()
    } else {
      ElMessage.error(userParams.id ? '修改失败' : '添加失败')
    }
  })
}

function assignRole(row: User) {
  Object.assign(userParams, row)
  reqAllRole(row.id as number).then((res: RoleResponseData) => {
    if (res.code === 200) {
      allRoles.value = res.data.allRolesList
      checkedRole.value = res.data.assignRoles
    }
  })
  toRole.value = true
}

function saveToRole() {
  let data: AssignRoleData = {
    userId: userParams.id as number,
    roleIdList: checkedRole.value.map((item: any) => item.id)
  }
  reqAssignRole(data).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success('分配角色成功')
      toRole.value = false
      getUser(currentPage.value)
    } else {
      ElMessage.error('分配角色失败')
    }
  })
}

const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
const checkedRole = ref<AllRole>([])
const allRoles = ref<AllRole>([])
const handleCheckAllChange = (val: boolean) => {
  checkedRole.value = val ? allRoles.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoles.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRoles.value.length
}

function deleteUser(row: User) {
  reqDelUser(row.id as number).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      getUser(userList.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
      ElMessage.error('删除失败')
    }
  })
}

function selectChange(val: any) {
  selectIdArr.value = val
}

function delUser() {
  let idList = selectIdArr.value.map((item: any) => item.id)
  reqDelAllUser(idList).then((res: any) => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      getUser(userList.value.length > 1 ? currentPage.value : currentPage.value - 1)
    } else {
      ElMessage.error('删除失败')
    }
  })
}

function search() {
  getUser()
  keyword.value = ''
}

function reset() {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
</script>
<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>