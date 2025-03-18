import  express from 'express'
import Repositorys from '../repositories/repositorys.js'
import UserController from '../controllers/userController.js'
import UserService from '../services/userService.js'

const router =express.Router()
const userController = new UserController(new UserService(new Repositorys))
router.post('/create-user',(req,res)=>userController.createUser(req,res))
router.get('/view-user',(req,res)=>userController.getAllUsers(req,res))
export default router