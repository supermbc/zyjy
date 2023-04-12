const user = require("../sql/user");
const jwt = require("jsonwebtoken");

// 如果传入了uId，表示只获取当前用户信息
// 如果没有传入uId，表示获取所有用户信息

module.exports = (req, res)=>{
    const {uId, token} = req.query;
    // 解析token，登录验证
    jwt.verify(token, "有志者事竟成", (tokenErr, tokenData)=>{
        if(tokenErr){
            res.send({
                code:0,
                msg:"登录失效"
            });
        }else if(!uId){
            // 没有发uId
            user.find({},{_id:0,__v:0},(err,data)=>{
                res.send({
                    code:1,
                    msg:"获取所有用户信息成功",
                    data
                })
            })
        }else{
            // 发uId
            user.find({uId}, {_id:0,__v:0}, (err,data)=>{
                res.send({
                    code:3,
                    msg:"获取单条用户信息成功",
                    data
                })
            })
        }
    })
}
