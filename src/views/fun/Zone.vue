<!-- <template>
  <el-table-column :data="tableData" border style="width: 100%">
    
    
    
    <el-button type="primary" @click="change">修改</el-button>
    <el-button type="primary" @click="del">删除</el-button>
  </el-table-column>
  </template> -->
  <template>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="num" label="序号" width="80" />
      <el-table-column prop="id" label="专区名称" width="300" />
      <el-table-column prop="desc" label="描述" width='400'/>
    <el-table-column prop="hour" label="课时" width='200'/>
    <el-table-column prop="state" label="状态" width='320'/>   
    </el-table>
  </template>
    <!-- <el-container class="layout-container-demo" style="height: 500px"> -->
      <!-- <el-container> -->
        <!-- <el-header class="top">
            <div>
                专区名称:
                <el-space :size="20">
                    <el-input v-model="input" placeholder="Please input" clearable />
                <el-button type="primary" @click="search">查询</el-button>
                <el-button @click="add">增加</el-button>
            </el-space>
            </div>

        </el-header> -->
  
        
  
  <!-- <el-table-column prop="num" type="index" label="序号" width="80" />
  <el-table-column prop="id" label="专区名称" width="300" />
  <el-table-column prop="desc" label="描述" width='400' />
  <el-table-column prop="hour" label="课时" width="105" />
  <el-table-column prop="state" label="状态" width="130" />
  <el-table-column prop="oper" label="操作" width="200">-->
        
        
      <!-- </el-container> -->
      
   
  
  <script setup>
  import { ref } from 'vue'
  import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

 
  const tableData =  [
  {
    num: '1',
    id: '职场技能',
    desc: '祝你提高职场竞争力',
    hour:'1',
    state:'正常',
    oper:''
  },
  {
    num: '2',
    id: '互联网技术',
    desc: '每一门都是好课程',
    hour:'2',
    state:'正常',
    oper:''
  },
  {
    num: '3',
    id: '工业制造',
    desc: '再造业培训',
    hour:'3',
    state:'正常',
    oper:''
  },
 ]
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
  .top{
   display: flex;
   align-items: center;
  }
  .el-pagination{
    display: flex;
    justify-content: center;
  }
  </style>
  