<template>
    <!-- Form -->
    <el-dialog v-model="dFVisible" title="Shipping address" :before-close="close">
    <el-form :model="passwordData">
      <el-form-item label="原密码">
        <el-input v-model="passwordData.oPassword" />
      </el-form-item>
      <el-form-item label="新密码" >
        <el-input v-model="passwordData.nPassword" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>

  </template>
  
  <script setup>
  import { reactive, ref ,watch} from 'vue'
  import {useUserStore} from '../../stores/counter'
  import {setMyPassword} from '../../api/user'
  const props = defineProps({dialogFormVisible:{},token:{},uId:{},rowData:{}})
  const dFVisible = ref(props.dialogFormVisible)
  const userStore = useUserStore()
  const uId = userStore.userMsg.uId
  const token = userStore.userMsg.token
  const passwordData = reactive({
    oPassword:"",
    nPassword:"",
    token,uId
  })
  const emits = defineEmits(['isShow','newData'])
  watch(()=>props.dialogFormVisible,(val)=>{
    dFVisible.value = val
  })

  function cancel(){
    dFVisible.value = false;
    emits('isShow',false);
    passwordData.oPassword = "";
    passwordData.nPassword = ""
  }
  function submit(){
    dFVisible.value = false;
    emits('isShow',false)
  
    setMyPassword(passwordData).then(res=>{
      if(res.data.code === 3){
        ElMessage({
          message:'密码修改成功，请重新登录',
          onClose(){
            localStorage.removeItem('userMsg');
            userStore.change_userMsg(null)
            passwordData.oPassword = "";
            passwordData.nPassword = ""
          }
        })

      }else{
        ElMessage({
          message:res.data.msg,
        })
      }
    })
    
  }
  function close(){
    // dFVisible.value = false;
    emits('isShow',false)
    passwordData.oPassword = "";
    passwordData.nPassword = ""
  }




  </script>
  <style scoped>
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
  </style>
  