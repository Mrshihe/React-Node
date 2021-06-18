const express = require('express')
const mongoose = require('mongoose')

const userRouter = require('./user')

// const DB_URL = 'mongodb://127.0.0.1:27017/imooc'
// mongoose.connect(DB_URL,function(err){
//   if(!err){
//     console.log('mongodb connect success!')
//   }
// })


const app = express()
const port = 9000

app.use('/user',userRouter)

app.listen(port, () => {
  console.log(`Serve listening at http://localhost:${port}`)
})