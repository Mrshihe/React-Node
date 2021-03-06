const express = require('express')

// 对用户密码进行MD5加密
const utility = require('utility')
const Router = express.Router()
const model = require('./mongo')

// 拿到用户表
const User = model.getModel('user')
const Chat = model.getModel('chat')
 
Router.get('/list',function(req, res){
  const { type } = req.query
  User.find({type},function(err, doc){
    if(!err){
      return res.json({code:0,data:doc})
    }else{
      return res.json({code:1,msg:'服务器繁忙,请稍后重试'})
    }
  })
})
Router.get('/info',function(req, res){
  const { userid } = req.cookies
  if(!userid){
    res.json({code:1})
  }else{
    // {'password': 0} 返回字段不显示password字段
    User.findOne({_id:userid},{'password':0},function(err,doc){
      if(err){
        return res.json({code:1,msg:'服务器繁忙,请稍后重试'})
      }
      return res.json({code:0, data:doc})
    })
  }
})
Router.post('/update',function(req, res){
  const { userid } = req.cookies
  const params = req.body
  if(!userid){
    res.json({code:113, msg:'登录超时,请重新登录'})
  }
  // { new: true } 返回更改后的信息
  User.findByIdAndUpdate(userid,params,{new: true},function(err,doc){
    if(err){
      return res.json({code:1, msg:'服务器繁忙,请稍后重试'})
    }
    return res.json({code:0, data:doc})
  })
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
      // 存储用户cookie
      res.cookie('userid', doc._id, {
        httpOnly: true
      })
      return res.json({code:0, data:doc})
    }
  })
})
Router.post('/logout',function(req,res){
  res.clearCookie('userid')
  res.json({code:0, msg:'您已注销'})
})
Router.get(`/msglist`,function(req,res){
  const { userid } = req.cookies
  const { talkid } = req.query
  const userquery = talkid ? {'$or':[{_id:userid},{_id:talkid}]} : {}
  const chatquery = talkid ? { chatid: [talkid,userid].sort().join('_') } : { to: userid }
  User.find(userquery,function(err,userdoc){
    if(!err){
      let users = {}
      userdoc.forEach(v=>{
        users[v._id] = {
          name: v.name,
          avatar: v.avatar
        }
      })
      // 多条件查询 我发出的和发给我的都查出来{'$or':[{from:userid},{to:userid}]}
      Chat.find(chatquery,function(err,doc){
        if(!err) return res.json({code:0, data:doc, users})
      })
    }else{
      return res.json({code:1, msg:'服务端查询失败'})
    }
  })
})
Router.post(`/readmsg`, function(req, res){
  const { fromid } = req.body
  const { userid } = req.cookies
  console.log( fromid, userid )
  // multi：true 修改多行
  Chat.update({from:fromid,to:userid},{'$set':{isRead:true}},{'multi':true},function(err,doc){
    if(!err){ 
      console.log(doc)
      return res.json({code:0, data: doc.nModified})
    }else{
      return res.json({code:1, msg:'服务器更新失败'})
    }
  })
})

module.exports = Router