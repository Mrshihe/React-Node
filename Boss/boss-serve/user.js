const express = require('express')
const formidable = require("formidable");
const fs = require('fs')
const path = require('path')

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
      res.cookie('userid', doc._id)
      return res.json({code:0, data:doc})
    }
  })
})

Router.post('/upload',function(req,res){
  const origin = req.headers.origin
  const form = new formidable.IncomingForm();
  form.parse(req, function(error, fields, files) {
    const type = files.file.type
    const extName = type === 'image/png' ? 'png' : 'jpg'
    const imgPath = path.join(__dirname, '/uploadImgs')
		// 如果目录不存在则创建
		if (!fs.existsSync(imgPath)) fs.mkdirSync(imgPath)
    const fileName = `${new Date().getTime()}.${extName}`
    // 保存图片
    fs.writeFileSync(`${imgPath}/${fileName}`, fs.readFileSync(files.file.path));
    res.json({code:0, data: `${origin}${fileName}`})
  })
})

module.exports = Router