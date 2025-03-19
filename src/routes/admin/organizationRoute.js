import express from "express";
import OrganizationController from "../../controllers/organizationController.js";
import OrganizationService from "../../services/organizationDetailsService.js";
import Repositorys from "../../repositories/repositorys.js";
import upload from "../../utils/multer.js";
import verifyToken from "../../utils/verifyToken.js";

const router = express.Router();
const OrganizationDetailsController = new OrganizationController(new OrganizationService(new Repositorys())); 

router.post("/add-organization",verifyToken,upload.single("logo"),(req, res) => OrganizationDetailsController.addOrganization(req, res)); 
router.get("/organization-details",verifyToken,(req,res)=>OrganizationDetailsController.organizationDetails(req,res))
export default router;