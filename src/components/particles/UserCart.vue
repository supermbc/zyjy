<template>
    <div style="display: flex; align-items: center">  
      <el-popover
        :width="300"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
      >
        <template #reference>
          <el-avatar :src="avatar" />
        </template>
        <template #default>
          <div
            class="demo-rich-conent"
            style="display: flex; gap: 16px; flex-direction: column"
          >
            <el-avatar
              :size="60"
              :src="avatar"
              style="margin-bottom: 8px"
            />
            <div>
              <span @click="$router.push('/myinfo')" class="message">个人信息</span>
              <el-button type="info" @click="exit" class="exit">退出</el-button>
            </div>
          </div>
        </template>
      </el-popover>
    </div>
  </template>
  
<script setup>
import {useUserStore} from '../../stores/counter'
import {ref ,computed,watch} from 'vue'
import { useRouter } from 'vue-router'
  const router = useRouter()


const userStore = useUserStore()
const title = ref('')
const userMsg = computed(()=>userStore.userMsg)
const avatar = ref(userMsg.value.avatar||'https://avatars.githubusercontent.com/u/72015883?v=4')
watch(()=>userMsg.value.avatar,val=>{
  avatar.value = val;
})
// watch(()=>userMsg.value.token,val=>{
//   token.value = val;
// })
// // console.log(userMsg.value.token)
// if(userMsg.value.token){
//   title.value = '退出'
// }else{
//   title.value = '未登录'
// }
function exit() {
  // if(!userMsg.value.token){
    // router.push('/login')
  // }else{
    localStorage.removeItem('userMsg');
    userStore.change_userMsg(null) 
  // }
}
</script>
<style scoped>
.demo-rich-conent{
  display: flex;
  justify-content: center;
  align-items: center;
}
.exit{
  width: 200px;
  background-color: rgb(78, 81, 86);
  border-radius: 30px;
}
.exit:hover{
  background-color: rgb(186, 185, 183);
}
.message{
  border-radius: 30px;
  width: 200px;
  line-height: 40px;
  text-align: center;
  display: block;
  background-color: rgb(149, 207, 255);
  margin-bottom: 5px;
  cursor: pointer;
}
.message:hover{
  background-color: rgb(139, 244, 176);
  color: white;
}
</style>