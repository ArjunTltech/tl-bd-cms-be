import  express from 'express'
import AuthController from '../controllers/authController.js'
import AuthService from '../services/authService.js'
import Repositorys from '../repositories/repositorys.js'

const router =express.Router()
const authController = new AuthController(new AuthService(new Repositorys))
router.post('/login',(req,res)=>authController.login(req,res))
router.post('/resetpassword',(req,res)=>authController.resetPassword(req,res))
export default router