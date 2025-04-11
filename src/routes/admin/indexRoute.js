import express from 'express'
import authRoute from './authRoute.js'
import enquryRoute from './enquiriesRoute.js'
import userRoute from './userRoute.js'
import organizationRoute from './organizationRoute.js'
import sliderRoute from './sliderRoute.js'
import socialRoute from './socialRoute.js'
import clientRoutes from './clientRoute.js'
import statsRoutes from './StatsRoute.js'
import seoRoutes from './seoRoute.js'
import categoryRoutes from './categoryRoute.js'
import notificationRoutes from './notificationRoute.js'
import TooltipRoutes from './tooltipRoute.js'
const router = express.Router()


router.use('/users', userRoute)
router.use('/auth', authRoute)
router.use('/enquiry', enquryRoute)
router.use('/organization', organizationRoute)
router.use('/slider', sliderRoute)
router.use('/social', socialRoute)
router.use("/client", clientRoutes);
router.use("/stats", statsRoutes);
router.use("/seo", seoRoutes);
router.use("/category", categoryRoutes);
router.use("/notification", notificationRoutes);
router.use("/tooltips", TooltipRoutes);




export default router