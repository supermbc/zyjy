const jwt = require("jsonwebtoken");
const payinfo = require("../sql/payinfo")
const user = require("../sql/user")
module.exports = (req, res, next)=>{
    let {order,classdata,tel,payment,state,price,power,token } = req.body;
    
    power -= 0;

    jwt.verify(token, "有志者事竟成", (tokenErr, tokenData)=>{
        if(tokenErr){
            res.send(JSON.stringify({
                code:0,
                msg:"登录失效"
            }))
        }else if(tokenData.power === 0){
            payinfo.find({ tel }, (err, data)=>{
                if(data.length < 1){
                    const classMsg = {
                        tel,
                        order,
                        classdata,
                        payment,
                        state,
                        price,
                        joinTime: Date.now()
                    };
                    payinfo.insertMany(classMsg, (err)=>{
                        res.send(JSON.stringify({
                            code:2,
                            msg:"信息添加成功"
                        }));
                    })
                }else{
                    res.send(JSON.stringify({
                        code:3,
                        msg:"该手机号已存在"
                    }));
                }
            })
        }else{
            res.send(JSON.stringify({
                code:1,
                msg:"权限不够，请联系管理员"
            }))
        }
    })
}
