import express from 'express'
import authRoute from './authRoute.js'
import enquryRoute from './enquiriesRoute.js'
import userRoute from './userRoute.js'
import organizationRoute from './organizationRoute.js'
import sliderRoute from './sliderRoute.js'
import socialRoute from './socialRoute.js'
import clientRoutes from './clientRoute.js'
import statsRoutes from './StatsRoute.js'
const router = express.Router()


router.use('/users', userRoute)
router.use('/auth', authRoute)
router.use('/enquiry', enquryRoute)
router.use('/organization', organizationRoute)
router.use('/slider', sliderRoute)
router.use('/social', socialRoute)
router.use("/client", clientRoutes);
router.use("/stats", statsRoutes);



export default router