// code away!
const server = require('./server')
const userRouter = require('./users/userRouter')


server.use('/api/user', userRouter)

server.listen(5000)