const user = require('../sql/user');
const jwt = require("jsonwebtoken");

// 只有管理员能删除用户
// 非管理员没有权限删除

module.exports = (req, res, next)=>{
    const {token, uId} = req.body;
    jwt.verify(token, "有志者事竟成", (tokenErr, tokenData)=>{
        if(tokenErr){
            res.send({
                code:0,
                msg:"登录失效"
            })
        }else if(tokenData.power === 0){
            user.deleteOne({
                uId
            }, err=>{
                res.send({
                    code:1,
                    msg:"删除成功"
                })
            })
        }else{
            res.send({
                code:1,
                msg:"没有权限"
            })
        }
    })
}
