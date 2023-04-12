<script setup>
import { reactive, ref } from 'vue'
import AvatarView from '../components/particles/AvatarView.vue'
import SetPassword from '../components/particles/SetPassword.vue';
import { useUserStore } from '../stores/counter'
import { getUser, setUser, getUsers } from '../api/user'
const userStore = useUserStore()
const token = userStore.userMsg.token
const uId = userStore.userMsg.uId
let userData = reactive({})
getUser(token, uId).then(res => {
    if (res.data.code !== 3) {
        ElMessage({
            message: res.data.msg,
            type: 'error'
        })
    } else {
        const o = res.data.data[0]
        userData.uName = o.uName;
        userData.tId = o.tId;
        userData.power = o.power;
        userData.sex = o.sex;
        userData.sex = userData.sex === 1 ? '男' : '女'
        userData.education = o.education;
        userData.tel = o.tel
        userData.age = o.age
    }
})
function submit() {
    userData.token = token;
    userData.uId = uId;
    setUser(userData).then(res => {
        if (res.data.code === 1) {
            ElMessage({
                message: '修改成功',
                type: 'success',
                onClose() {
                    // 修改用户状态管理器的数据   
                }
            })
        } else {
            ElMessage({
                message: res.data.msg,
                type: 'error',
            })
        }
    })
}
const dialogFormVisible = ref(false)
const updatePw = () => {
    dialogFormVisible.value = true
}
function isShow(val) {
    dialogFormVisible.value = val
}
</script>
<template>
    <div class="avatar">
        <AvatarView class="add"></AvatarView>
        <el-form :model="userData" class="elform">
            <el-form-item label="姓名" style="width:300px">
                <el-input v-model="userData.uName" />
            </el-form-item>
            <el-form-item label="性别" style="width:300px">
                <el-input v-model="userData.sex" />
            </el-form-item>
            <el-form-item label="手机" style="width:300px">
                <el-input v-model="userData.tel" />
            </el-form-item>
            <el-form-item label="年龄" style="width:300px">
                <el-input v-model="userData.age" />
            </el-form-item>
            <el-form-item label="学校" style="width:300px">
                <el-input v-model="userData.education" />
            </el-form-item>

        </el-form>
        <el-button type="primary" @click.prevent="updatePw">
            修改密码
        </el-button>

        <!-- <el-button type="primary" @click="submit">
        提交
    </el-button> -->
        <SetPassword :dialogFormVisible="dialogFormVisible" @isShow='isShow'></SetPassword>
    </div>

</template>

<style scoped>
.avatar{
  margin-left: 400px;
}
.elform{
    margin-top: 20px;
}
.add{
    margin-left: 90px;
}
</style>