const express = require("express");

const login = require("./modules/login")
const addUser = require("./modules/adduser")
const getUser = require("./modules/getuser");
const setUser = require("./modules/setuser");
const password = require("./modules/password");
const avatar = require("./modules/avatar");
const delUser = require("./modules/deluser");
///////
const addclass = require("./modules/addclass");
const delclass = require("./modules/delclass");
const setclass = require("./modules/setclass");
const getclass = require("./modules/getclass");

const multer = require("multer");
const upload = multer( {dest: "./upload"} );

const app = express();

// 生成超管信息
const addAdmin = require("./sql/addAdmin");
addAdmin();

// 注册中间件，解析前端发送的 数据类型为 application/json 的请求体
app.use( express.json() )

app.use( express.static("./static") );
app.use( express.static("./upload") );
app.use( express.urlencoded({ extended: false }) );
app.use( upload.any() );

// cors配置
app.all("*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","get,post");
    res.header("Access-Control-Allow-Headers",'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, token');
    next();
})

// 用户登录
app.get( "/login", login );
// 管理员添加用户信息
app.post( "/adduser", addUser );
// 获取所有用户信息 & 获取指定用户信息
app.get( "/getuser", getUser );
// 管理员修改指定用户基本信息
app.post( "/setuser", setUser );
// 管理员&用户修改密码信息
app.post( "/password", password );
// 管理员&用户修改头像信息
app.post( "/avatar", avatar );
// 管理员删除用户信息
app.post( "/deluser", delUser );
//
app.post("/addclass",addclass);
app.get("/getclass",getclass);
app.post("/delclass",delclass);
app.post("/setclass",setclass);

app.listen(3002, ()=>{
    console.log("会议室管理系统baseURL：http://localhost:3000")
})