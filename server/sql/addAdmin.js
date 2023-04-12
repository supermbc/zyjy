const user = require("./user");
const uuid = require("uuid");
const md5 = require("md5");

module.exports = ()=>{
    user.find({username: "admin"}, (err,data)=>{
        if(data.length < 1){
            user.insertMany({
                uId: "user-" + uuid.v1(),
                tId: "team-719d9e50-a24d-11ed-b470-f587b156d3dd",
                uName: "超管",
                username: "admin",
                password: md5("123456"),
                power: 0,
                tel: 12345678910,
                avatar: "",
                joinTime: Date.now()
            }, ()=>{
                console.log("管理员信息插入成功")
            })
        }else{
            console.log("超管信息：admin，123456");
        }
    })
}

