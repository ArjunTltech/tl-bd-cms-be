import express from "express";
import BrochureController from "../../controllers/brochureController.js";
import BrochureService from "../../services/brochureService.js";
import Repositorys from "../../repositories/repositorys.js";
import upload from "../../utils/multer.js";


const router = express.Router();
const brochureController = new BrochureController(new BrochureService(new Repositorys())); 

router.post("/add-brochure",upload.single("image"),(req, res) => brochureController.addBrochure(req, res)); 
router.get("/get-all-brochure",(req, res) => brochureController.getAllBrochure(req, res)); 
router.delete("/delete-brochure/:id", (req,res)=>brochureController.deleteBrochure(req,res))
router.put("/edit-brochure/:id", (req, res) => brochureController.editBrochure(req, res));

export default router;