const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL,function(err){
  if(!err){
    console.log('mongodb connect success!')
  }
})
const models = {
  user: {
    name: {type:String, require: true},
    password: {type:String, require: true},
    type: {type: String, require: true},
    avatar: {type: String},
    desc: {type: String}, // 个人/公司简介
    title: {type: String}, // 职位名称
    company: {type: String}, // 公司名称
    money: {type: String}, // 薪资
    jobrequirements: {type: String} //职位要求
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name){
    return mongoose.model(name)
  }
}