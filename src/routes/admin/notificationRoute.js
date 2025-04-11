import express from 'express';

import NotificationController from "../../controllers/notificationController.js";
import NotificationService from "../../services/notificationService.js";
import Repositorys from "../../repositories/repositorys.js";
import verifyJwtToken from '../../middlewares/verifyJwtToken.js';

const router = express.Router();
const notificationController = new NotificationController(new NotificationService(new Repositorys())); 

router.get('/get-all-notifications',verifyJwtToken,(req,res)=>notificationController.getAllNotifications(req,res));
// router.put('/mark-as-read/:id', verifyJwtToken,markAsRead);
// router.put('/mark-all-as-read',verifyJwtToken,markAllAsRead)
router.delete('/delete/:id',verifyJwtToken,(req,res)=>notificationController.deleteNotification(req,res))
router.delete('/clear-all-notifications',verifyJwtToken,(req,res)=>notificationController.clearAllNotifications(req,res));




//testing api
// router.post('/trigger-notification', triggerNotification);

export default router;