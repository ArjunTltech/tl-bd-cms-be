import express from 'express'

import categoryRoutes from './categoryRoute.js'
import sliderRoutes from './sliderRoute.js'
import enqiuiryRoutes from './enquiryRoute.js'
import socialRoute from './socialRoute.js'
import TooltipRoutes from './tooltipRoute.js'
const router = express.Router()


router.use("/category", categoryRoutes);
router.use("/slider", sliderRoutes);
router.use("/enquiry", enqiuiryRoutes);
router.use('/social',socialRoute)
router.use("/tooltips", TooltipRoutes);



export default router