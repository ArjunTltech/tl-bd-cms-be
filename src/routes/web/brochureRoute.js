import express from "express";
import BrochureController from "../../controllers/brochureController.js";
import BrochureService from "../../services/brochureService.js";
import Repositorys from "../../repositories/repositorys.js";


const router = express.Router();
const brochureController = new BrochureController(new BrochureService(new Repositorys())); 

router.get("/get-all-brochure",(req, res) => brochureController.getAllBrochure(req, res)); 

export default router;