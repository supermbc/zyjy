<template>
    <el-container class="layout-container-demo" style="height: 500px">
      <el-container>
        <el-header>
            <div>
                手机号:
                <el-space :size="20">
                    <el-input v-model="input" placeholder="请输入手机号" clearable/>
                <el-button type="primary" @click="search(userData)">查询</el-button>
                <el-button @click="$router.push('/addclass')">增加</el-button>
            </el-space>
            </div>
        </el-header>
 
  <el-table :data="userD.userData" border style="width: 100%">
    <el-table-column prop="date" type="index" label="序号" width="180" />
    <el-table-column prop="order" label="订单号" width="180" />
    <el-table-column prop="classdata" label="课程信息" />
    <el-table-column prop="tel" label="手机号" />
    <el-table-column prop="payment" label="支付方式" />
    <!-- <el-table-column prop="address" label="订单状态" /> -->
    <el-table-column prop="price" label="价格" />
    <el-table-column prop="address" label="操作"  #default="scope">
      <el-button  @click.prevent="deleteClass(scope.row)">删除</el-button>
      </el-table-column>
  </el-table>

      </el-container>
    </el-container>
  </template>
  
  <script setup>
  import { ref ,reactive} from 'vue'
  import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
  import {useUserStore} from '../../stores/counter'
  import {getClass,delClass} from '../../api/class'

  const userStore = useUserStore();
  const token = userStore.userMsg.token
  const input = ref('')

 const userD = reactive({
  userData:[]
 })
  getClass(token).then(res=>{
    res.data.data.forEach(val=>{
      val.payment = val.payment===0?'微信':(val.payment===1?'支付宝':'网银')
      userD.userData.push(val)
 
    })
  })

  function deleteClass(row){
    console.log(row.tel)
    delClass({token,tel:row.tel}).then(res=>{
      let i=0;
    userD.userData.some((val,idx)=>{
      i = idx;
      return val.tel === row.tel;;
    })
    userD.userData.splice(i, 1);
    })
  }
  const  arr = userD.userData
  const search = ()=>{
    userD.userData = arr
    userD.userData =  userD.userData.filter((val,idx)=>{
        return (val.tel.indexOf(input.value) !=-1)
      })
  }
  </script>
  
  <style scoped>
  .layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
  }
  .layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }
  .layout-container-demo .el-menu {
    border-right: none;
  }
  .layout-container-demo .el-main {
    padding: 0;
  }
  .layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
  }


  .el-pagination{
    display: flex;
    justify-content: center;
  } 
  </style>
  