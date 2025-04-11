import  express from 'express'
import Repositorys from '../../repositories/repositorys.js'
import UserController from '../../controllers/userController.js'
import UserService from '../../services/userService.js'
import verifyJwtToken from '../../middlewares/verifyJwtToken.js'
import { verifyRole } from '../../middlewares/verifyRole.js'

const router =express.Router()
const userController = new UserController(new UserService(new Repositorys))

router.post('/create-user',verifyJwtToken, verifyRole('superadmin'),(req,res)=>userController.createUser(req,res))
router.put('/update/:id',verifyJwtToken, verifyRole('superadmin'),(req,res)=>userController.updateUser(req,res))
router.get('/view-user',verifyJwtToken, verifyRole('superadmin'),(req,res)=>userController.getAllUsers(req,res))
router.delete('/delete/:id',verifyJwtToken, verifyRole('superadmin'),(req,res)=>userController.deleteUser(req,res))
router.get('/get-profile',verifyJwtToken, verifyRole('superadmin'),(req,res)=>userController.getProfile(req,res))
router.put('/update-profile',verifyJwtToken,verifyRole('superadmin'),(req,res)=>userController.updateProfile(req,res))
router.post("/change-password",verifyJwtToken,verifyRole('superadmin'),(req,res)=>userController.changePassword(req,res))

export default router