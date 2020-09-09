// code away!
const server = require('./server')
const userRouter = require('./users/userRouter')
server.use('/user/', userRouter)

server.listen(5000)