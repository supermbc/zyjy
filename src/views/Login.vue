<script setup>
import { ref ,computed} from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/counter'
import { loginApi } from '../api/user';
const userStore = useUserStore()
// 根据状态管理器，创建响应式数据
const userMsg = computed(() => {
  return userStore.userMsg
})
// 定义响应式数据
const username = ref("");
const password = ref("");

// 接收自定义事件
const emits = defineEmits(["login"])
const router = useRouter()
function clickFn(){
  emits('login',username.value,password.value,userMsg)
}



// 定义方法，执行自定义事件，传输用户名和密码
// async function loginVue(un, pw) {
//   console.log(3223)
//   const loginRes = await loginApi(un, pw)
//   const loginData = loginRes.data
//   if (loginData.code === 0) {
//     // 处理用户信息
//     const um = {
//       token: loginData.data.token,
//       username: loginData.data.username,
//       uId: loginData.data.uId,
//       power: loginData.data.power,
//       avatar: loginData.data.avatar
//     }
//     ElMessage({
//       showClose: true,
//       message: '登录成功，正在跳转',
//       type: 'success',
//       onClose: () => {
//         // router.push('/index')
//         localStorage.setItem('userMsg', JSON.stringify(um))
//         userStore.change_userMsg(um)
//       }
//     })
//   }
// }
</script>
<template>
  <div class="loginBox">
    <div class="loginContent">
      <h2>资优教育管理系统</h2>
      <el-input v-model="username" class="input" placeholder="请输入用户名" clearable /><br>
      <el-input v-model="password" class="input" type="password" placeholder="请输入密码" show-password /><br>
      <el-button class="login" type="success" @click="clickFn(username, password)">登录</el-button>
      <p>内部系统，如需使用请联系管理员获取账号</p>
    </div>
    <particles></particles>
  </div>
</template>

<style >
.loginBox {
  /* background:#efefef; */
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.loginContent {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  height: 250px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2
}

.loginContent h2 {
  text-align: center;
  margin-bottom: 10px;
  color: black
}

.loginContent .input {
  margin: 10px 0;
  color: white;
}


.loginContent p {
  font-size: 12px;
  color: rgba(18, 16, 17, 0.5);
  margin: 10px 0;
}

.loginContent .login {
  width: 100%;
  margin: 0 auto;
  background-color: rgba(26, 23, 188, 0.5);
  border:0px;
}

.input .el-input__wrapper {
  background-color: rgba(255, 255, 255, 0.5);
  color: white;
}

.input .el-input__inner {
  color: rgba(0, 0, 0, 1);
}

section .el-footer {
  display: none;
}
</style>
<script>
import Particles from '@/components/particles/index.vue'
export default {
  components: {
    "particles": Particles
  },
  created() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: 'static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-shizuku/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '../static/live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json' },
        display: { position: 'right', width: 300, height: 500 },
        mobile: { show: true },
        log: false
      })
    }, 100)
  },
};

</script>