const express = require('express')
// 对用户密码进行MD5加密
const utility = require('utility')
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
  User.findOne({name: username},function(err,doc){
    if(err){
      return res.json({code:1, msg:'服务器繁忙,请稍后重试'})
    }
    if(doc){
      return res.json({code:1, msg:'该用户名已存在'})
    }
    User.create({name:username,password:utility.md5(password),type:radioGroup},function(err,doc){
      if(err){
        return res.json({code:1, msg:'服务器繁忙,请稍后重试'})
      }
      return res.json({code:0, msg:'注册成功'})
    })
  })
})
Router.post('/login',function(req,res){
  const { username, password } = req.body
  User.findOne({name:username,password:utility.md5(password)},{'password':0},function(err,doc){
    if(err){
      return res.json({code:1, msg:'服务器繁忙,请稍后重试'})
    }
    if(!doc){
      return res.json({code:1, msg:'用户名或密码不正确'})
    }else{
      return res.json({code:0, data:doc})
    }
  })
})

module.exports = Router