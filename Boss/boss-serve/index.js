const express = require('express')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')
const toolsRouter = require('./tools')
const model = require('./mongo')

// 拿到消息表
const Chat = model.getModel('chat')

const app = express()

const server =require('http').Server(app)
// cors 设置允许跨域
const io = require('socket.io')(server,{ cors: true })

const port = 9000
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 静态资源托管，将uploadImgs下的图片、css文件等对外开放访问权限
app.use(express.static('uploadImgs'));
app.use('/user',userRouter)
app.use('/tools',toolsRouter)

io.on('connection',function(socket){
  // 接收客服端消息
  socket.on('sendmsg',function(data){
    console.log(data)
    const { from, to, content } = data
    // 根据两个id进行排序生成chatid
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content},function(err,doc){
      if(!err){
        //向全局广播消息
        console.log(doc)
        io.emit('recvmsg',Object.assign({},doc))
      }
    })
  })
})

server.listen(port, () => {
  console.log(`Serve listening at http://localhost:${port}`)
})