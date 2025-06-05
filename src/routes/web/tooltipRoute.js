import  express from 'express'
import TooltipController from '../../controllers/tooltipController.js'
import TooltipService from '../../services/tooltipService.js'
import Repositorys from '../../repositories/repositorys.js'




const router =express.Router()
const tooltipController = new TooltipController(new TooltipService(new Repositorys))

router.get('/get-tooltip/:fieldType',(req,res)=>tooltipController.getTooltipByFieldType(req,res))
router.get('/view-all-tooltips',(req,res)=>tooltipController.getTooltip(req,res))



export default router