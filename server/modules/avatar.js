const user = require("../sql/user");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

module.exports = (req, res)=>{
    const {token, uId} = req.body;
    const file = req.files[0];
    jwt.verify(token, "有志者事竟成", (tokenErr, tokenData)=>{
        if(tokenErr){
            res.send({
                code:0,
                msg:"登录失效"
            });
        }else{
            const oldName = path.join(__dirname, "..", file.path);
            const newName = oldName + "-" + file.originalname;
            
            fs.rename(oldName, newName, err=>{
                user.find({
                    uId
                }, (err2, data)=>{
                    if(data.length > 0){
                        const serverPath = "http://20.187.111.28:3002" + newName.split("upload")[1];
                        user.updateOne({
                            uId
                        }, {
                            avatar: serverPath
                        }, ()=>{
                            res.send({
                                code:1,
                                msg:"头像上传成功",
				url:serverPath
                            })
                        })
                    }else{
                        res.send({
                            code:2,
                            msg:"该用户不存在"
                        })
                    }
                })
            })
        }
    })
}