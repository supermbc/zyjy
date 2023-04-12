import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 为了持久化存储状态，借助本地存储
  let userMsgLocal = localStorage.getItem('userMsg')
  userMsgLocal = userMsgLocal ? JSON.parse(userMsgLocal) : {};
  // 创建响应式状态
  const userMsg = ref(userMsgLocal)


  function change_userMsg(obj) {
    // 根据是否传入指定字段，决定修改那些字段
    if(obj === null){
      userMsg.value = {};
    }else{
      obj.token && (userMsg.value.token = obj.token);
      obj.uName && (userMsg.value.uName = obj.uName);
      obj.uId && (userMsg.value.uId = obj.uId);
      obj.power && (userMsg.value.power = obj.power);
      obj.avatar && (userMsg.value.avatar = obj.avatar);
    }
    // userMsg.value = obj
  }
  // 暴露响应式状态和方法
  return { userMsg, change_userMsg }
})
