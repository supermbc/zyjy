import axios from "axios";
export default {
  getInfoo(res) {
    return axios.get("../../public/su.json")
  }
}

