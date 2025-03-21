import express from "express";
import EnquiryController from "../../controllers/enquiryController.js";
import EnquiresService from "../../services/enquiresService.js";
import Repositorys from "../../repositories/repositorys.js";


const router = express.Router();
const enquiryController = new EnquiryController(new EnquiresService(new Repositorys())); 

router.get("/get-all-enqiuries", (req, res) => enquiryController.enquiresDetails(req, res)); 
router.post("/add-enqiuires",(req,res)=>enquiryController.addEnquiry(req,res))
router.post("/delete-enqiuires/:id",(req,res)=>enquiryController.deleteEnquiry(req,res))

export default router;