const mongoose = require("./db");

const userSchema = new mongoose.Schema({
    uId: {type:String},
    tId: {type:String},
    uName: {type:String},
    username: {type:String},
    password: {type:String},
    school:{type:String},
    education:{type:String},
    age:{type:Number},
    location:{type:String},
    sex:{type:Number},     //1男 2女
    course:{type:String},
    classroom:{type:String},
    power: {type:Number},       // 0超级，1讲师，2学生
    tel: {type:String},
    avatar: {type:String},
    joinTime: {type:Number}
})

module.exports = mongoose.model("users", userSchema);