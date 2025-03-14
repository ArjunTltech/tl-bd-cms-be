import  express from 'express'
import AuthController from '../controllers/authController.js'
import AuthService from '../services/authService.js'

const router =express.Router()
const authController = new AuthController(new AuthService)
router.post('/login',(req,res)=>authController.login(req,res))
router.post('/resetpassword',(req,res)=>authController.resetPassword(req,res))
export default router