import express from 'express'
import authRoute from './authRoute.js'
import enquryRoute from './enquiriesRoute.js'
import userRoute from './userRoute.js'
const router = express.Router()


router.use('/user',userRoute)
router.use('/auth',authRoute)
router.use('/enquiry',enquryRoute)



export default router