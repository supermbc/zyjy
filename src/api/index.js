import axios from "axios";
export default {
  getInfos(res){
    return axios.get(`/proxy/api/v1/courses?openState=1&sortBy=person&order=desc&page=${res}`)
  }
}

