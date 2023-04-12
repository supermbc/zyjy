const mongoose = require("./db");

const userSchema = new mongoose.Schema({
  order: { type: String },
  classdata: { type: String },
  tel: { type: String },
  payment: { type: Number }, //1银联2支付宝3微信   
  state: { type: Number },  //1成功2失败
  price: { type: Number },
  joinTime: { type: Number },
})

module.exports = mongoose.model("payinfo", userSchema);