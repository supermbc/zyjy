<script setup>
import { reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '../../stores/counter';
const userStore = useUserStore();
const power = userStore.userMsg.power


let navList = reactive([
  {
    id: 'fufjreajferj',
    title: '首页',
    path: "/",
    icon: 'Loading',
    power: [0,1,2]
  },
  {
  id: 'fdassdga',
  title: '课程管理',
  path: "/nengli",
  icon: 'Share',
  children: [{
    id: 'hjkhkjh',
    title: '课程列表',
    path: "/classlist",
    icon: 'Loading',
    power: [0, 1, 2]
  },
  {
    id: 'gfsdgfdgf',
    title: '课程资源',
    path: "/calssfication",
    icon: 'Loading',
    power: [0]
  }
  ],
  power: [0, 1,2]
}, {
  id: 'jijlfsa',
  title: '用户管理',
  path: "/student",
  icon: 'Loading',
  power: [0, 1, 2],
  children: [{
    id: 'fahkkjfah',
    title: '学员',
    path: "/student",
    icon: 'Loading',
    power: [0,1]
  }, {
    id: 'fagkok90sah',
    title: '讲师',
    path: "/teacher",
    icon: 'Loading',
    power: [0,1]
  }]
}, {
  id: 'fhkasj',
  title: '权限管理',
  path: "",
  icon: 'Loading',
  power: [0],
  children: [{
    id: 'fa32fdsafeah',
    title: '账号管理',
    path: "/usermanager",
    icon: 'Loading',
    power: [0,1]
  },{
    id: 'fafsfdsaah',
    title: '角色管理',
    path: "/role",
    icon: 'Loading',
    power: [0,1]
  }]
}, {
  id: 'ffdsfsdfgerj',
  title: '常用功能',
  path: "",
  icon: 'Loading',
  power: [0],
  children: [{
    id: 'fuihjkerj',
    title: '专区管理',
    path: "/zone",
    icon: 'Loading',
    power: [0],
  },{
    id: 'fuihjkerj',
    title: '课程订单',
    path: "/order",
    icon: 'Loading',
    power: [0,1],
  }]
}])

// 根据区分权限一级和二级权限
navList = navList.filter(val=>{
  if(val.children){
    val.children = filter(val.children,power)
  }
  return val.power.includes(power)
})
function filter(arr,power){
  return arr.filter(val=>{
    return val.power.includes(power)
  })
}
const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}
</script>
<template>
  <el-menu default-active="2" class="el-menu-vertical-demo menuList" @open="handleOpen" @close="handleClose">
    <el-sub-menu v-for="(item, idx) in navList" :index="idx + 1 + ''" :class="item.children ? '' : 'hide_arrow'">
      <template #title>
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <RouterLink :to="item.path" :key="item.id">
          {{ item.title }}
        </RouterLink>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item-group v-if="item.children">
        <el-menu-item :index="(idx + 1) + '-' + (i + 1)" v-for="(val, i) in item.children" :key="val.id"
          @click="$router.push(val.path)">
          <el-icon>
            <component :is="val.icon"></component>
          </el-icon>
            {{ val.title }}
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<style>
.menuList .hide_arrow .el-sub-menu__icon-arrow {
  display: none;
}
</style>
