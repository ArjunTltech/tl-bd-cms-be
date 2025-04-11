import express from "express";
import EnquiryController from "../../controllers/enquiryController.js";
import EnquiresService from "../../services/enquiresService.js";
import Repositorys from "../../repositories/repositorys.js";


const router = express.Router();
const enquiryController = new EnquiryController(new EnquiresService(new Repositorys())); 

router.post("/add-enqiuires",(req,res)=>enquiryController.addEnquiry(req,res))

export default router;