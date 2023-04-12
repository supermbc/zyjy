const payinfo = require("../sql/payinfo");
const jwt = require("jsonwebtoken");
const user = require("../sql/user")
// 管理员可以修改所有用户的所有信息
// token，power，要修改用户的uId，要修改的信息

// 非管理员只能修改个人有限的信息：密码，头像（其他接口）

module.exports = (req, res, next)=>{
    const {token,order,classdata,tel,payment,state,price} = req.body;

    const payMsg = {};
    if(order) payMsg.order = order;
    if(classdata) payMsg.classdata = classdata;
    if(payment) payMsg.payment = payment - 0;
    if(state) payMsg.state = state - 0;
    if(price) payMsg.price = price - 0;

    jwt.verify(token, "有志者事竟成", (tokenErr, tokenData)=>{
        if(tokenErr){
            res.send({
                code:0,
                msg:"登录失效"
            })
        }else if(tokenData.power === 0){
          payinfo.updateOne({
                tel
            }, payMsg, err=>{
                res.send({
                    code: 1,
                    msg: "修改成功"
                })
            })
        }else{
            res.send({
                code:2,
                msg:"权限不够"
            })
        }
    })
}
