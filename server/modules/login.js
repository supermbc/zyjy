const user = require("../sql/user");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

module.exports = (req, res)=>{
    // 解析前端发送的数据
    const un = req.query.username;
    const pw = req.query.password;
    // 根据用户名读取数据库
    user.find({username: un}, (err,data)=>{
        if(data.length > 0){
            // 读到了，判断密码是否一致
            if(data[0].password === md5(pw)){
                // 登录成功
                
                // 生成token
                const token = jwt.sign({
                    uId: data[0].uId,
                    username: data[0].username,
                    power: data[0].power
                }, "有志者事竟成", {
                    expiresIn: 60 * 60
                })

                res.send({
                    code:0,
                    msg:"登录成功",
                    data:{
                        uId: data[0].uId,
			tId: data[0].tId,
                        username: data[0].username,
                        power: data[0].power,
			avatar: data[0].avatar,
                        token
                    }
                });
            }else{
                res.send({
                    code:1,
                    msg:"密码不对"
                });
            }
        }else{
            // 没读到信息，表示用户名不存在
            res.send({
                code:2,
                msg:"用户名不存在"
            });
        }
    })
}