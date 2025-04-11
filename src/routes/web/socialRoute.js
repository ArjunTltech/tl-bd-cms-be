import  express from 'express'
import Repositorys from '../../repositories/repositorys.js'
import SocialService from '../../services/socialService.js'
import SocialController from '../../controllers/socialController.js'



const router =express.Router()
const socialController = new SocialController(new SocialService(new Repositorys))

router.get('/get-all-social',(req,res)=>socialController.getAllWebSocials(req,res))


export default router