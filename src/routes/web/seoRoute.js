import express from "express";
import SEOController from "../../controllers/seoController.js";
import SeoService from "../../services/seoService.js";
import Repositorys from "../../repositories/repositorys.js";

const router = express.Router();
const seoControllers = new SEOController(new SeoService(new Repositorys())); 
router.get('/get/:pageTitle',(req,res)=>seoControllers.getSeo(req,res));

export default router;