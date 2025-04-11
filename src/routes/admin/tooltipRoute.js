import  express from 'express'
import Repositorys from '../../repositories/repositorys.js'
import verifyJwtToken from '../../middlewares/verifyJwtToken.js'
import TooltipController from '../../controllers/tooltipController.js'
import TooltipService from '../../services/tooltipService.js'


const router =express.Router()
const tooltipController = new TooltipController(new TooltipService(new Repositorys))

router.post('/create-tooltip',verifyJwtToken,(req,res)=>tooltipController.upsertTooltip(req,res))
router.get('/view-tooltip/:fieldType',verifyJwtToken,(req,res)=>tooltipController.getTooltipByFieldType(req,res))
router.get('/view-tooltips',verifyJwtToken,(req,res)=>tooltipController.getTooltip(req,res))

export default router