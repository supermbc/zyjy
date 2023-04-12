<script setup>
import { reactive, ref } from 'vue';
// // import Avatar from "@/components/Avatar.vue";
// // import SetPasswordDialog from "@/components/SetPasswordDialog.vue";
import {addClass} from '../../api/class'
import {getUser} from '../../api/user'

import { useUserStore } from '@/stores/counter';

// import { usePowerOps, useTeamOps } from '@/hooks';
const powerOptions = [{
    label:'微信',
    value:0
},{
    label:'支付宝',
    value:1
},{
    label:'网银',
    value:2
}];
// const teamOptions = useTeamOps();

const userStore = useUserStore();
const token = userStore.userMsg.token;
const ruleFormRef = ref(null);
// const uId = userStore.userMsg.uId;

let userData = reactive({
    order:'',
    classdata:'',
    tel:'',
    payment:'',
    price:''
});
// getUser(token, uId).then(res=>{
//   console.log(res.data);
//   if(res.data.code !==3 ){
//     ElMessage({
//       message:res.data.msg,
//       type:"error"
//     })
//   }else{
//     const o = res.data.data[0]
//     userData.uName = o.uName;
//     userData.tId = o.tId;
//     userData.power = o.power;
//   }
// })
const formSize = ref('default')
const resetForm = (formEl) => {
    //   if (!formEl) return
    userData.order = ''
    userData.classdata = ''
    userData.tel = ''
    userData.payment = ''
    userData.price = ''
    ElMessage({
        showClose: true,
        message: "表单清空成功",
        type:"info"
    })
}
const rules = reactive({})

// let userData = reactive({
//     order:'',
//     classdata:'',
//     tel:'',
//     payment:'',
//     price:''
// });

function submit(formEl){
  userData.token = token;
  addClass(userData).then(res=>{
    if(res.data.code===2){
        ElMessage({
        duration:500,
        message:"添加成功",
        type:"success",
        onClose(){
          // 修改用户状态管理器的数据
          // 如果当前组件中没有将状态管理器中的数据处理成响应式，那么还要同步更新userData中的数据
          formEl.resetFields()
        }
    })
    }else{
        ElMessage({
        message:res.data.msg,
        type:"error"
      })
    }
  })
//   userData.uId = uId;
//   setUser(userData).then(res=>{
//     // console.log(res.data);
//     if(res.data.code === 1){
//       ElMessage({
//         message:"修改成功",
//         type:"success",
//         onClose(){
//           // 修改用户状态管理器的数据
//           // 如果当前组件中没有将状态管理器中的数据处理成响应式，那么还要同步更新userData中的数据
//         }
//       })
//     }else{
//       ElMessage({
//         message:res.data.msg,
//         type:"error"
//       })
//     }
//   })
}

const dialogFormVisible = ref(false);
const updatePw = () => {
  dialogFormVisible.value = true;
}

function isShow(val){
  dialogFormVisible.value = val;
}
</script>

<template>
  <main>
    <h1>添加课程</h1>
    <!-- <Avatar></Avatar> -->
    <el-form 
    ref="ruleFormRef"
      :model="userData"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon>
        <el-form-item label="订单号" style="width: 400px">
          <el-input v-model="userData.order"/>
        </el-form-item>
        <el-form-item label="课程信息 " style="width: 400px">
          <el-input v-model="userData.classdata"/>
        </el-form-item>
        <el-form-item label="手机号" style="width: 400px">
          <el-input v-model="userData.tel"/>
        </el-form-item>
        <el-form-item label="支付方式">
         <el-select-v2
            v-model="userData.payment"
            :options="powerOptions"
          /> 
        </el-form-item>
        <el-form-item label="价格 " style="width: 400px">
          <el-input v-model="userData.price"/>
        </el-form-item>
        <el-form-item label="" style="width: 400px">  
            <el-button type="primary" @click="submit(ruleFormRef)" >
                添加
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            <el-button type="primary" @click="$router.push('/order')" >
                回到课程订单
            </el-button>
        </el-form-item>
    </el-form>
    <!-- <SetPasswordDialog
        :dialogFormVisible="dialogFormVisible"
        @isShow="isShow"
    ></SetPasswordDialog> -->
  </main>
</template>
