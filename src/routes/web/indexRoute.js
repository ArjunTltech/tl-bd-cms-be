import express from 'express'

import categoryRoutes from './categoryRoute.js'
import sliderRoutes from './sliderRoute.js'
import enqiuiryRoutes from './enquiryRoute.js'
import socialRoute from './socialRoute.js'
import TooltipRoutes from './tooltipRoute.js'
import chatbotRoutes from './chatbotRoute.js'
import seoRoutes from './seoRoute.js'
import brochureRoutes from './brochureRoute.js'
const router = express.Router()


router.use("/category", categoryRoutes);
router.use("/slider", sliderRoutes);
router.use("/enquiry", enqiuiryRoutes);
router.use('/social',socialRoute)
router.use("/tooltips", TooltipRoutes);
router.use("/chatbot", chatbotRoutes);
router.use("/seo", seoRoutes);
router.use("/brochure", brochureRoutes);



export default router