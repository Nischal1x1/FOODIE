const Router = require('express')
const {createUser, verifyUser} = require('../controllers/auth')

const authRouter = Router()


authRouter.post('/signup', createUser)
authRouter.post('/login', verifyUser)
module.exports = authRouter