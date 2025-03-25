import express from "express";
import seoController from "../../controllers/seoController.js";
import seoService from "../../services/seoService.js";
import Repositorys from "../../repositories/repositorys.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";

const router = express.Router();
const seoControllers = new seoController(new seoService(new Repositorys())); 
router.post('/upsert/:pageTitle',verifyJwtToken,(req,res)=>seoControllers.upsertSEO(req,res));
router.get('/get/:pageTitle',verifyJwtToken,(req,res)=>seoControllers.getSeo(req,res));

export default router;