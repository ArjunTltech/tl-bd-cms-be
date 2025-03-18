import express from "express";
import ContactController from "../../controllers/contactController.js";
import ContactService from "../../services/contactService.js";

const router = express.Router();
const contactController = new ContactController(new ContactService()); 

router.post("/contact", (req, res) => contactController.contact(req, res)); 

export default router;