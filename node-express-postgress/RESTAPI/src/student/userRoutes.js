const { Router } = require('express')
const controller = require('./controller')
const userRouter = Router()

userRouter.post('/', controller.addEmpUsers)
userRouter.post('/login', controller.loginEmpUser)
userRouter.get('/', controller.getEmpUsers)

module.exports = userRouter
