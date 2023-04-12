import axios from '../tools/request'
// 获取课程信息
export function getClass(token){
    return axios.get('/getclass',{
        params:{
            token
        }
    })
}

// 添加课程
export function addClass(ops){
    return axios.post('/addclass',ops)
  }

//   删除课程
export function delClass(ops){
    return axios.post('/delclass',ops)
  }