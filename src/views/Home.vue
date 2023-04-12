<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-carousel :interval="4000" type="card" height="350px" >
          <el-carousel-item v-for="(item,index) in imgs" :key="index">
            <img :src="item" class="bannerimg">
          </el-carousel-item>
        </el-carousel><el-row :gutter=20>
            <el-col v-for="(item, index) in datainfo" :key="index" :span="6" >
              <el-card :body-style="{ padding: '0px' }" >
                <img :src="item.pictureUrl"
                  class="animimage" />
                <div style="padding: 14px">
                  <h3>{{item.name}}</h3><br>
                  <el-icon style="vertical-align: -10%;"><School /></el-icon> <span>{{item.teacherFirst.schoolName +"&emsp;"+ item.teacherFirst.teacherName}}</span><br>
                  <span class="smalltext">{{item.platform}}</span><br>
                  <span class="smalltext">累计选课&emsp;{{item.totalEnroll}}</span>
                  <div class="bottom">
                    <el-button type="primary" class="button">点击选课</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-pagination @current-change="handleCurrentChange"  style="margin: 0 auto;" background layout="prev, pager, next" :total="1000" />
          </el-row>                                                         
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { RouterView } from "vue-router"
import { reactive } from "vue"
import logo from "/src/logo.jpg"
import img1 from '../img/1.jpg'
import img2 from '../img/2.jpg'
import img3 from '../img/3.jpg'
import img4 from '../img/4.jpg'
import img5 from '../img/5.jpg'
import img6 from '../img/6.jpg'
const imgs = reactive([img1, img2, img3, img4, img5, img6])
const fits = ['contain']
// const emit = defineEmits(['login'])
// function logins(){
//   emit('login','/login')
// }
</script>
<script>
import API from '../api'
// import { onMounted } from "vue";
import { reactive,ref } from "vue";
const datainfo = ref([])
export default {
  data () {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        pagenum: 1, // 当前页码
        pagesize: 20 // 每页显示条数
      },
    }
  },
  created () {
    this.getinfos(this.queryInfo.pagenum)
  },
  methods: {
    async getinfos () {
      const {data:{courses}} = await API.getInfos(this.queryInfo.pagenum)
      datainfo.value = courses
      // console.log(courses);
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getinfos()
    }
  }
 
}
</script>
<style>

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.bannerimg{
	width: 100%;
  height: 100%;
}
.el-footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  background-color: black;
  color: white;
}
.animimage{
  width: 100%;
  display: block;
}
.el-card{
  margin-bottom: 20px;
}
.classlist{
  font-size: 50px;
  color:black
}
/*  */
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  width: 100px;
  /* min-height: auto; */
  font-size: 12px;
}
.smalltext{
  font-size: 12px;
  color: #808080;
}

</style>