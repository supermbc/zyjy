<template>
    <!-- Form -->
    <el-dialog v-model="dFVisible" title="Shipping address" :before-close="close">
    <el-form :model="userData">
      <el-form-item label="姓名">
        <el-input v-model="userData.uName" />
      </el-form-item>
      <el-form-item label="手机号" >
        <el-input v-model="userData.tel" />
      </el-form-item>
      <el-form-item label="年龄" >
        <el-input v-model="userData.age" />
      </el-form-item>
      <el-form-item label="学校" >
        <el-input v-model="userData.education" />
      </el-form-item>
      <!-- <el-form-item label="部门">
        <el-select-v2 v-model="userData.tId" placeholder="请选择部门" :options="teamOptions" />
      </el-form-item> -->
      <el-form-item label="职位">
        <el-select-v2 v-model="userData.power" placeholder="请选择部门" :options="powerOptions" />
      </el-form-item>
    </el-form>
    <el-button  type="primary"  @click.prevent="updatePw">
      修改密码
    </el-button>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <SetPassword :dialogFormVisible="dialogFormVisible" @isShow='isShow'></SetPassword>

  </template>
  
  <script setup>
  import { reactive, ref ,watch} from 'vue'
  const props = defineProps({dialogFormVisible:{},token:{},uId:{},rowData:{}})
  const dFVisible = ref(props.dialogFormVisible)
  const userData = reactive({
    password:'******'
  })
  const dialogFormVisible = ref(false)

  const updatePw = () => {
  dialogFormVisible.value = true
}
  const emits = defineEmits(['isShow','newData'])
  watch(()=>props.dialogFormVisible,(val)=>{
    dFVisible.value = val
  })

  watch(props.rowData,(val)=>{
    userData.uId = val.uId
    userData.tId = val.tId
    userData.tel = val.tel
    userData.age = val.age
    userData.sex = val.sex
    userData.education = val.education
    userData.uName = val.uName
    userData.power = val.power
    // userData.username = val.username
  })
  function cancel(){
    dFVisible.value = false;
    emits('isShow',false)
  }
  function submit(){
    dFVisible.value = false;
    emits('isShow',false)
    emits('newData',userData)
  }
  function close(){
    // dFVisible.value = false;
    emits('isShow',false)
  }
  
//   const teamOptions = teamStore.teamMsg.map(val => ({
//     value: val.tId,
//     label: val.tName
// }))


const powerOptions = [{
    value: 1,
    label: '讲师'
}, {
    value: 0,
    label: '管理'
}, {
    value: 2,
    label: '员工'
}]
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
  