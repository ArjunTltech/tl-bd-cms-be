import express from "express";
import EnquiryController from "../../controllers/enquiryController.js";
import EnquiresService from "../../services/enquiresService.js";
import Repositorys from "../../repositories/repositorys.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";


const router = express.Router();
const enquiryController = new EnquiryController(new EnquiresService(new Repositorys())); 

router.get("/get-all-enqiuries",verifyJwtToken, (req, res) => enquiryController.enquiresDetails(req, res)); 
router.post("/add-enqiuires",(req,res)=>enquiryController.addEnquiry(req,res))
router.post("/delete-enqiuires/:id",verifyJwtToken,(req,res)=>enquiryController.deleteEnquiry(req,res))
router.get("/export-enquiry",verifyJwtToken, (req,res)=>enquiryController.exportEnquiries(req,res));

export default router;