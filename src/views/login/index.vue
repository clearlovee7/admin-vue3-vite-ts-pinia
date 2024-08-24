<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :rules="rules" :model="loginForm" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              placeholder="请输入用户名"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" class="login_btn" @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import userUserStore from '../../store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '../../utils/time'
let router = useRouter()
let route = useRoute()
let useStore = userUserStore()
let loginForm = reactive({ username: 'admin', password: '111111' })
let loading = ref(false)
let loginForms = ref()

const login = async () => {
  await loginForms.value.validate()
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    let redirect:any = route.query.redirect
    router.push({path: redirect || '/'})
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`
    })
    loading.value = false
  } catch (err) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (err as Error).message
    })
  }
}

//自定义校验规则
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度不得低于五位'))
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度不得低于六位'))
  }
}

const rules = reactive({
  username: [
    // { required: true, message: '用户名不能为空', trigger: 'blur' },
    // { min: 5, message: '用户名长度不能小于5', trigger: 'change' }
    { trigger: 'blur', validator: validateUsername }
  ],
  password: [
    // { required: true, message: '密码不能为空', trigger: 'blur' }
    { trigger: 'blur', validator: validatePassword }
  ]
})
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    width: 80%;
    top: 30vh;
    position: relative;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: #fff;
      font-size: 40px;
    }

    h2 {
      color: #fff;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>