const express = require('express')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')
const toolsRouter = require('./tools')

const app = express()
const port = 9000
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 静态资源托管，将uploadImgs下的图片、css文件等对外开放访问权限
app.use(express.static('uploadImgs'));
app.use('/user',userRouter)
app.use('/tools',toolsRouter)

app.listen(port, () => {
  console.log(`Serve listening at http://localhost:${port}`)
})