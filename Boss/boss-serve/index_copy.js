const express = require('express')
const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
mongoose.connect(DB_URL,function(err){
  if(!err){
    console.log('mongodb connect success!')
  }
})
const User = mongoose.model('users',new mongoose.Schema({
  name: { type: String, require: true},
  age: { type: Number, require: true }
}))
// 新建数据
// User.create({
//   name: '小宋',
//   age: 28
// },function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })

// 查询数据 {}表示查询所有
// User.find({},function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })

// 删除数据 age:28为删除条件
// User.remove({age:28},function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })

// 更新操作
// User.update({name:'小华'},{'$set':{age:30}},function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })

const app = express()
const port = 9000

app.get('/', (req, res) => {
  res.send('Hello World!!!@@@')
})

app.listen(port, () => {
  console.log(`Serve listening at http://localhost:${port}`)
})