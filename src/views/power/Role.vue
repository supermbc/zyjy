<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '../../stores/counter'
import { addUser } from '../../api/user'
const formSize = ref('default')
const ruleFormRef = ref(null)
// const teamStore = useTeamStore()
const userStore = useUserStore()
const ruleForm = reactive({
    uName: '',
    tel: '',
    tId: '',
    power: '',
    sex:'',
    education:'',
    uId:''
})
const rules = reactive({
})
const reg = /^1\d{10}$/

const submitForm = async (formEl) => {
    ruleForm.token = await userStore.userMsg.token
    if(!reg.test(ruleForm.tel)){
    ElMessage({
            message: '手机号格式有误',
            type: 'error',
            duration:1000,
            onClose: () => {
        }
        })
        return
    }

    addUser(ruleForm).then(res => {
        ElMessage({
            message: res.data.msg,
            type: 'success',
            onClose: () => {
                formEl.resetFields()
            }
        })
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
// const teamOptions = [{}]
// const teamOptions = teamStore.teamMsg.map(val => ({
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
    label: '学员'
}]
const sexOptions=[{
    value: 1,
    label: '男'
}, {
    value: 2,
    label: '女'
}]

</script>
<template>
    <div class="meeting">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="用户名" prop="uName">
                <el-input v-model="ruleForm.uName" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select-v2 v-model="ruleForm.sex" placeholder="性别" :options="sexOptions" />
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
                <el-input v-model="ruleForm.tel" />
            </el-form-item>
            <el-form-item label="学校" prop="education">
                <el-input v-model="ruleForm.education" />
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="ruleForm.age" />
            </el-form-item>
            <el-form-item label="职位" prop="power">
                <el-select-v2 v-model="ruleForm.power" placeholder="请选择职位" :options="powerOptions" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    添加
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
            <!-- <p>{{ ruleForm }}</p> -->
        </el-form>
    </div>
</template>