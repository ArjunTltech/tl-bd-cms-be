import express from 'express'
import authRoute from './authRoute.js'
import enquryRoute from './enquiriesRoute.js'
import userRoute from './userRoute.js'
import organizationRoute from './organizationRoute.js'
import sliderRoute from './sliderRoute.js'
const router = express.Router()


router.use('/user',userRoute)
router.use('/auth',authRoute)
router.use('/enquiry',enquryRoute)
router.use('/organization',organizationRoute)
router.use('/slider',sliderRoute)



export default router