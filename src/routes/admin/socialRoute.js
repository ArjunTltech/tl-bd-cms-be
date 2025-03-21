import  express from 'express'
import Repositorys from '../../repositories/repositorys.js'
import SocialService from '../../services/socialService.js'
import SocialController from '../../controllers/socialController.js'


const router =express.Router()
const socialController = new SocialController(new SocialService(new Repositorys))
router.post('/create-social',(req,res)=>socialController.createSocial(req,res))
router.get('/get-social',(req,res)=>socialController.getAllSocials(req,res))
router.put('/update-social/:id',(req,res)=>socialController.updateSocial(req,res))
router.delete('/delete-social/:id',(req,res)=>socialController.deleteSocial(req,res))
router.get('/get-social/:id',(req,res)=>socialController.getSocialById(req,res))

export default router