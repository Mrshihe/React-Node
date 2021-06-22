const express = require('express')
const formidable = require("formidable");
const fs = require('fs')
const path = require('path')

const Router = express.Router()

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