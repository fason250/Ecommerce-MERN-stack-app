import express from 'express'
import { signInUser,signUpUser,loginAdmin } from '../controllers/userController.js'

const userRouter = express.Router()


userRouter.post('/register', signUpUser)
userRouter.post('/login', signInUser)
userRouter.post('/admin', loginAdmin)

export default userRouter