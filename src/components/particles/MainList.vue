<template>
    <div>
      <div class="common-layout" >
        <el-container>
          <el-aside width="200px">
            <RouterLink v-for="item in navList" :to="item.path" :key="item.id">
              {{ item.title }}
            </RouterLink>
            <MenuList></MenuList>
          </el-aside>
          <el-container>
            <el-header>
              <div>Logo</div>
              <UserCart></UserCart>
            </el-header>
            <el-main>
              <!-- <RouterView></RouterView> -->
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>  
  
  </template>
  <script setup>
  import MenuList from '../particles/MenuList.vue'
  import { RouterLink, RouterView } from 'vue-router';
  // import { useRouter } from 'vue-router'
//   import Home from './views/Home.vue'
  // const router = useRouter()
  // function loginApi(a){
  //   router.push(a)
  // }
  </script>
  <style>
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;
    background: #428bca;
  }
  
  /* .el-main{
    background-color: #;
  } */
  .el-container {
    flex-direction: row;
  }
  </style>
  