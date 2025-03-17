import express from 'express'
import authRoute from '../routes/authRoute.js'
import userRoute from '../routes/userRoute.js'
const router = express.Router()


router.use('/user',userRoute)
router.use('/auth',authRoute)

export default router