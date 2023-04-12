const mongoose = require("mongoose");

// mongoDB地址
const dbAddress = "mongodb://127.0.0.1:27017/";
// 数据库名
const dbName = "zyjy";

mongoose.connect(dbAddress + dbName);

mongoose.connection.on("connected", ()=>{})
mongoose.connection.on("error", ()=>{
    console.log("数据库连接失败")
})
mongoose.connection.on("disconnected", ()=>{
    console.log("数据库连接断开")
})

module.exports = mongoose;