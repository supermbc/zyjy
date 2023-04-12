const user = require("../sql/user");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// 管理员不需要验证老密码
// 普通用户需要验证老密码
// 如果非管理员，没有老密码，修改失败

module.exports = (req, res, next)=>{
    const {token, uId, oPassword, nPassword} = req.body;

    jwt.verify(token, "有志者事竟成", (tokenErr, tokenData)=>{
        if(tokenErr){
            res.send({
                code:0,
                msg:"登录失效"
            })
        }else if(!oPassword && tokenData.power === 0){
            user.updateOne({
                uId
            }, {
                password: md5(nPassword)
            }, err=>{
                res.send({
                    code:1,
                    msg:"管理员修改成功"
                })
            })
        }else if(!oPassword && tokenData.power !== 0){
            res.send({
                code:2,
                msg:"没有权限或缺少原密码"
            })
        }else if(oPassword){
            user.find({
                uId
            }, (err, data)=>{
                if(data[0].password === md5(oPassword)){
                    user.updateOne({
                        uId
                    }, {
                        password: md5(nPassword)
                    }, err=>{
                        res.send({
                            code:3,
                            msg:"个人修改成功"
                        })
                    })
                }else{
                    res.send({
                        code:4,
                        msg:"原密码不对"
                    })
                }
            })
        }
    })
}
