import express from "express";
import ChatbotService from "../../services/chatbotService.js";
import ChatbotController from "../../controllers/chatbotController.js";
import Repositorys from "../../repositories/repositorys.js";


const router = express.Router();
const chatbotController = new ChatbotController(new ChatbotService(new Repositorys())); 

router.post("/create-questions", (req, res) => chatbotController.createChat(req, res)); 
router.delete("/delete-question/:id", (req, res) => chatbotController.deleteQuestion(req, res)); 
router.get("/get-all-question", (req, res) => chatbotController.getAllchats(req, res)); 
router.put("/update-question/:id",(req, res) =>chatbotController.editQuestion(req, res))
router.put("/change-order",(req, res) =>chatbotController.chatOrder(req, res))

export default router;