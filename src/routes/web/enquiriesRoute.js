import express from "express";
import EnquiryController from "../../controllers/enquiryController.js";
import EnquiresService from "../../services/enquiresService.js";

const router = express.Router();
const enquiryController = new EnquiryController(new EnquiresService()); 

router.post("/add-enqiuires",(req,res)=>enquiryController.addEnquiry(req,res))
export default router;