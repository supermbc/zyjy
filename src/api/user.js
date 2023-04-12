import axios from '../tools/request'
export function loginApi(un, pw) {
  return axios.get("/login", {
    params: {
      username: un,
      password: pw
    }
  })
}

export function getUsers(token){
  return axios.get('/getuser',{
      params:{
          token
      }
  })
}
export function getUser(token,uId){
  return axios.get('getuser',{
      params:{
          token,uId
      }
  })
}
// 添加个人信息的接口
export function addUser(ops){
  return axios.post('/adduser',ops)
}

// 删除个人信息
export function delUser(ops){
  return axios.post('/deluser',ops)
}

// 修改个人信息
export function setUser(ops){
  return axios.post('/setuser',ops)
}

// 修改个人密码
export function setMyPassword(ops){
  return axios.post('/password',ops)
}

