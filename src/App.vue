<template>
  <div v-if="userMsg.token">
    <div class="common-layout">
      <el-container>
        <el-header>
          <el-header class="header-tou">
            <div class="demo-image">
              <el-image style="width: 200px; height: 100%" :src="logo" />
            </div>
          </el-header>
          <!-- <el-button type="primary" @click="$router.push('/login')" class="logins">登录</el-button> -->
          <UserCart></UserCart>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <RouterLink v-for="item in navList" :to="item.path" :key="item.id">
              {{ item.title }}
            </RouterLink>
            <MenuList></MenuList>
          </el-aside>
          <el-main>
            <Suspense><RouterView /></Suspense>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
  <LoginView v-else @login="loginVue"></LoginView>
</template>
<script setup>
import MenuList from './components/particles/MenuList.vue'
import {computed} from 'vue'
// import { RouterLink, RouterView,useRouter  } from 'vue-router';
import logo from "/src/logo.jpg"
import UserCart from './components/particles/UserCart.vue'
import LoginView from './views/Login.vue'
import { loginApi } from './api/user'
import { useUserStore } from './stores/counter'
const userStore = useUserStore()
// 根据状态管理器，创建响应式数据
const userMsg = computed(() => {
  return userStore.userMsg
})

// 定义方法，执行自定义事件，传输用户名和密码
async function loginVue(un, pw) {
  console.log(3223)
  const loginRes = await loginApi(un, pw)
  const loginData = loginRes.data
  if (loginData.code === 0) {
    // 处理用户信息
    const um = {
      token: loginData.data.token,
      username: loginData.data.username,
      uId: loginData.data.uId,
      power: loginData.data.power,
      avatar: loginData.data.avatar
    }
    ElMessage({
      showClose: true,
      duration:500,
      message: '登录成功，正在跳转',
      type: 'success',
      onClose: () => {
        // router.push('/index')
        localStorage.setItem('userMsg', JSON.stringify(um))
        userStore.change_userMsg(um)
        location.reload()
      }
    })
  }
}
</script>
<style>
.common-layout{
  width: 100%;
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  background: #eef4fa;
  /* position: sticky;
  top: 0;
  left: 0;
  z-index: 999; */
}
.el-aside{
  overflow: scroll;
  height: 600px;
  position: relative;
}
.common-layout{
  position: fixed;
  height:700px;
  overflow: scroll;
}
.common-layout .el-main .common-layout{
  width: 80%;
}
.logins{
  margin-left: 1060px;
}
.footer-container{
  position: fixed;
  bottom: 0;
}
.footer{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px ;
  background-color: black;
  color: white;
  position: fixed;
  bottom: 0;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>
