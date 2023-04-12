<template>
  <el-table :data="userDatas" style="width: 100%" max-height="450">
    <el-table-column prop="uName" label="姓名" width="120" />
    <el-table-column prop="sex" label="性别" width="120" />
    <el-table-column prop="username" label="用户名" width="120" />
    <el-table-column prop="pw" label="密码" width="120" />
    <el-table-column prop="tel" label="手机号" width="200" />
    <el-table-column prop="job" label="职位" width="120" />
    <el-table-column prop="education" label="学校" width="120" />
    <el-table-column prop="age" label="年龄" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.row)">
          删除
        </el-button>
        <el-button link type="primary" size="small" @click.prevent="updateRow(scope.row)">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <UserUpdate :dialogFormVisible="dialogFormVisible" :uId="uId" :token="token" @isShow="isShow" :rowData='rowData' @NewData="getNewData"></UserUpdate>
  <!-- <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button>
<SetUserDialog :dialogFormVisible="dialogFormVisible" :uId="uId" :token="token" @isShow="isShow" :rowData='rowData'
  @NewData='getNewData'></SetUserDialog> -->
</template>
<script setup>
import { reactive ,ref} from 'vue';
import { getUsers ,delUser,setUser} from '../../api/user'
import { useUserStore } from '../../stores/counter'
import UserUpdate from '../../components/particles/UserUpdate.vue'
import { loadRouteLocation } from 'vue-router';
const userStore = useUserStore()
const uId = userStore.userMsg.uId;
const token = userStore.userMsg.token;
const power = userStore.userMsg.power;
const userRes = await (getUsers(token))
const userData = userRes.data
const userDatas = reactive([])
userData.data.forEach( async val => {
  val.job = val.power === 0 ? '管理员' : (val.power === 1 ? '讲师' : '学员')
  val.sex = val.sex === 1?'男':'女'
  val.pw = '******'
  userDatas.push(val)
})
const dialogFormVisible = ref(false)
const rowData = reactive({})
const updateRow = (row) => {
  if (row.username === 'admin' || userStore.userMsg.power!==0){
    ElMessage('权限不够，请联系管理员')
    return 
  } 
  dialogFormVisible.value = true
  rowData.uName = row.uName;
  rowData.tId = row.tId;
  rowData.uId = row.uId;
  rowData.power = row.power;
  rowData.age = row.age;
  rowData.tel = row.tel;
  rowData.education = row.education;
  rowData.sex = row.sex;
}


function deleteRow(row) {
  console.log(row)
  if (row.username === 'admin'||userStore.userMsg.power!==0){
    ElMessage('权限不够，请联系管理员')
    return
  } 
  delUser({ token, uId: row.uId }).then(res => {
    ElMessage({
      message: res.data.msg,
      type: 'info'
    })
    let i = 0;
    userDatas.some((val, idx) => {
      i = idx;
      return val.uId === row.id
    })
    userDatas.splice(i, 1)
  })
}
function isShow(val) {
  dialogFormVisible.value = val
}
function getNewData(newData){
  newData.token = token
  if (newData.password === '******') {
    delete newData.password
  }
  setUser(newData).then(res => {
    if (res.data.code === 1) {
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
      userDatas.forEach(async val => {
        if (val.uId === newData.uId) {
          val.uName = newData.uName;
          val.tId = newData.tId;
          val.power = newData.power;
          val.tel = newData.tel;
          val.education = newData.education;
          val.sex = newData.sex
          val.age = newData.age
          // val.username = newData.username
          val.job = val.power === 0 ? '管理' : (val.power === 1 ? '讲师' : '学员')
        }
      })
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error'
      })
    }
  })
}
</script>