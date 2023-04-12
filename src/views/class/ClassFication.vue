<template>
    <el-table :data="tableData" border style="width: 100%; margin:0 auto;">
        <el-table-column prop="date" type="index" label="序号" width="180" />
        <el-table-column prop="name" label="资源名称" width="180" />
        <el-table-column prop="size" label="资源大小" />
        <el-table-column prop="typea" label="资源类型" />
        <el-table-column prop="download" label="操作">
            <el-link style="margin:10px" href="https://pan.xm00.cn/fps/1.avi">下载</el-link>
            <el-button>
                <el-link href="https://pan.xm00.cn/fps/2.avi">更多资源</el-link>
            </el-button>
        </el-table-column>
    </el-table>
</template>
<script  setup>
const tableData = [
    {
        name: '编程',
        size: '526MB',
        typea: '视频',

    }, {
        name: '更多资源',
        size: '',
        typea: '视频',

    }
]

</script>
