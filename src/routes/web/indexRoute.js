import express from 'express'
import enquryRoute from './enquiriesRoute.js'
// import userRoute from './userRoute.js'
import socialRoute from './socialRoute.js'
const router = express.Router()


// router.use('/user',userRoute)
router.use('/enquiry',enquryRoute)
router.use('/social',socialRoute)



export default router