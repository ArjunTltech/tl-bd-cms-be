import express from "express";
import OrganizationController from "../../controllers/organizationController.js";
import OrganizationService from "../../services/organizationDetailsService.js";
import Repositorys from "../../repositories/repositorys.js";
import upload from "../../utils/multer.js";

const router = express.Router();
const OrganizationDetailsController = new OrganizationController(new OrganizationService(new Repositorys())); 

router.post("/add-organization",upload.single("image"),(req, res) => OrganizationDetailsController.addOrganization(req, res)); 
router.get("/organization-details",(req,res)=>OrganizationDetailsController.organizationDetails(req,res))
export default router;