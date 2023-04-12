const user = require("../sql/user");
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// 管理员可以修改所有用户的所有信息
// token，power，要修改用户的uId，要修改的信息

// 非管理员只能修改个人有限的信息：密码，头像（其他接口）

module.exports = (req, res, next)=>{
    const {token, uId, tId, uName, power,school,education,age,location,sex,course,classroom, password} = req.body;

    const userMsg = {};
    if(tId) userMsg.tId = tId;
    if(uName) userMsg.uName = uName;
    if(power) userMsg.power = power - 0;
    if(password) userMsg.password = md5(password);
    if(school) userMsg.school = school;
    if(education) userMsg.education = education;
    if(age) userMsg.age = age - 0;
    if(location) userMsg.location = location;
    if(sex) userMsg.sex = sex - 0;
    if(course) userMsg.course = course;
    if(classroom) userMsg.classroom = classroom;

    jwt.verify(token, "有志者事竟成", (tokenErr, tokenData)=>{
        if(tokenErr){
            res.send({
                code:0,
                msg:"登录失效"
            })
        }else if(tokenData.power === 0){
            user.updateOne({
                uId
            }, userMsg, err=>{
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
