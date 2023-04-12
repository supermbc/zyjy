<template>
    <el-header>
            <div>
                手机号:
                <el-space :size="20">
                    <el-input v-model="input" placeholder="请输入手机号" clearable/>
                <el-button type="primary" @click="search(userD.userData)">查询</el-button>
            </el-space>
            </div>
        </el-header>
  <el-table :data="userD.userData" border style="width: 100%" class="tableStudent">
    <el-table-column prop="joinTime" label="jobtime" width="180" />
    <el-table-column prop="uName" label="uName" width="180" />
    <el-table-column prop="age" label="age" />
    <el-table-column prop="sex" label="sex" />
    <el-table-column prop="tel" label="tel" />
    <el-table-column prop="education" label="education" />
  </el-table>
</template>

<script setup>
import {getUsers} from '../../api/user'
import { useUserStore } from '../../stores/counter';
import {reactive,ref} from 'vue'
const userStore = useUserStore()
const token = userStore.userMsg.token;
const input = ref('')
const userD = reactive({
  userData:[]
})
let time = ref('')
getUsers(token).then(res=>{
  res.data.data.forEach(val=>{

    if(val.power===2){
      val.sex = val.sex===1?'男':'女'
      val.joinTime = getHMS(val.joinTime)
      userD.userData.push(val)
    }
  })
})
const  arr = userD.userData
  const search = ()=>{
    userD.userData = arr
    userD.userData =  userD.userData.filter((val,idx)=>{
        return (val.tel.indexOf(input.value) !=-1)
      })
  }
//时间戳转时间  年/月/日 时:分:秒
function getHMS (a) {
  var date = new Date(a);
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
 
  // var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
  // var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) 
  // var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  return Y + M + D 
}
</script>
<style scoped>
.tableStudent{
  height: 520px;
}
</style>
