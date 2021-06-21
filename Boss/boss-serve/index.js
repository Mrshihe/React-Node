const express = require('express')
const cookieParser = require('cookie-parser')

const userRouter = require('./user')

const app = express()
const port = 9000
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/user',userRouter)

app.listen(port, () => {
  console.log(`Serve listening at http://localhost:${port}`)
})