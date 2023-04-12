<template >
    <div class="classlist">
        <!-- <el-input v-model="input2" class="w-50 m-2" placeholder="Please Input"
            style="width: 200px; margin-bottom:10px ;" /> -->
        <!-- <el-button style="margin-left:10px">查询</el-button><el-button>重置</el-button> -->
        <el-table :data="datainfo" border style="width: 100%">
            <el-table-column prop="num" type="index" label="序号" width="100" />
            <el-table-column label="封面" width="180">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.pictureUrl
                        " />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="teacherFirst.schoolName" label="学校" width="220" />
            <el-table-column prop="teacherFirst.teacherName" label="讲师" width="100" />
            <el-table-column prop="jiage" label="价格" width="80" />
            <el-table-column prop="xuexi" label="购买/学习" width="100" />
            <el-table-column prop="shomai" label="售卖" width="100" />
            <el-table-column prop="zhuantai" label="状态" width="80" />
            <el-table-column prop="caozuo" label="操作">
                <el-button text @click="open">数据</el-button>
                <!-- <el-button>更多操作</el-button> -->
            </el-table-column>
        </el-table>

    </div>
</template>

<script  setup>
// import su from './su.json'
import { ref, onMounted } from 'vue'
import API from "../../api/index2"
import { ElMessage, ElMessageBox } from 'element-plus'
// import { Action } from 'element-plus'







// import {getInfoo} from '../../api/index'
const open = () => {
    ElMessageBox.alert(
        "无响应式数据",
        '数据列表',
        {
            dangerouslyUseHTMLString: true,
        }
    )
}

// import { login } from '@api'



// const token = userStore.useMrsg.token
// console.log(JSON.parse(su));
const datainfo = ref([])
onMounted(() => {
    getInfoo()
})
const getInfoo = async () => {
    const { data: { courses } } = await API.getInfoo()
    datainfo.value = courses
}
// JSON.parse()
</script>

<style scoped>
.classlist{
    height: 600px;
}
</style>
