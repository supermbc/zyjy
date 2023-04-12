<template>
    <el-upload :action="avatarUrl" list-type="picture-card" :auto-upload="true"
     method="post" :multiple="true" name="file" :data="ops"
      :show-file-list="false" :onSuccess="change">
        <img class="el-upload-list__item-thumbnail" :src="avatar" alt="" />
    </el-upload>
  

  </template>
  <script setup>
  import { ref ,reactive,computed} from 'vue'
  import {useUserStore} from '../../stores/counter'
  const userStore = useUserStore()
  const userMsg = computed(()=>userStore.userMsg);
  
  const avatarUrl = ref('http://20.187.111.28:3002/avatar')


  const avatar = ref(userMsg.value.avatar||"https://avatars.githubusercontent.com/u/72015883?v=4")
const ops = reactive({
    uId:userStore.userMsg.uId,
    token:userStore.userMsg.token
})
function change(file){
   if(file.code ===1 ){
      avatar.value = file.url;
      userStore.change_userMsg({
        avatar:file.url
      })
   }
}
function error(){}
</script>

<style>
.el-upload .el-upload-list__item-thumbnail{
  width: 148px;
}
</style>
  