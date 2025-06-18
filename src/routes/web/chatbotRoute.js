import express from "express";
import ChatbotController from "../../controllers/chatbotController.js";
import ChatbotService from "../../services/chatbotService.js";
import Repositorys from "../../repositories/repositorys.js";



const router = express.Router();
const chatbotController = new ChatbotController(new ChatbotService(new Repositorys())); 

router.get("/get-all-question", (req, res) => chatbotController.getAllchats(req, res)); 

export default router;