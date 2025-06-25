import express from "express";
import BrochureController from "../../controllers/brochureController.js";
import BrochureService from "../../services/brochureService.js";
import Repositorys from "../../repositories/repositorys.js";
import upload from "../../utils/multer.js";


const router = express.Router();
const sliderController = new BrochureController(new BrochureService(new Repositorys())); 

router.post("/add-brochure",upload.single("file"),(req, res) => sliderController.addBrochure(req, res)); 
router.get("/get-all-brochure",(req, res) => sliderController.getAllBrochure(req, res)); 
router.delete("/delete-brochure/:id", (req,res)=>sliderController.deleteBrochure(req,res))

export default router;