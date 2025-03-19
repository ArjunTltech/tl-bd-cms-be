import express from "express";
import EnquiryController from "../../controllers/enquiryController.js";
import EnquiresService from "../../services/enquiresService.js";
import Repositorys from "../../repositories/repositorys.js";
import verifyToken from "../../utils/verifyToken.js";

const router = express.Router();
const enquiryController = new EnquiryController(new EnquiresService(new Repositorys())); 

router.get("/enqiuries", (req, res) => enquiryController.enquiresDetails(req, res)); 
router.post("/add-enqiuires",verifyToken,(req,res)=>enquiryController.addEnquiry(req,res))
export default router;