import express from 'express'
import { UserController } from '../controllers/auth.js'
import { validateUserFields } from '../middlewares/auth.js'

export const authRouter = express.Router()

authRouter.get('/login', UserController.show)

authRouter.post('/login', validateUserFields, UserController.login)

authRouter.get('/signup', UserController.registerShow)

authRouter.post('/signup', validateUserFields, UserController.register)

authRouter.get('/logout', UserController.logout)
