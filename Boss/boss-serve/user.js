const express = require('express')
const Router = express.Router()
const model = require('./mongo')

// 拿到用户表
const User = model.getModel('user')
 
Router.get('/list',function(req, res){
  User.find({},function(err, doc){
    if(!err){
      return res.json({code:0,data:doc})
    }else{
      return res.json({code:1,msg:'服务器繁忙,请稍后重试'})
    }
  })
})
Router.get('/info',function(req, res){
  res.json({code:1})
})
Router.post('/register',function(req, res){
  const { username, password, radioGroup } = req.body
})

module.exports = Router