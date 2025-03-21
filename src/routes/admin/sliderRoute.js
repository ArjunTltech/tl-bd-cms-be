import express from "express";
import SliderController from "../../controllers/sliderController.js";
import SliderService from "../../services/sliderService.js";
import Repositorys from "../../repositories/repositorys.js";
import upload from "../../utils/multer.js";

const router = express.Router();
const sliderController = new SliderController(new SliderService(new Repositorys())); 

router.post("/add-slider",upload.single("image"),(req, res) => sliderController.addSlider(req, res)); 
router.get("/slider-details",(req,res)=>sliderController.getSlider(req,res))
router.delete("/delete-slider/:id",(req,res)=>sliderController.deleteSlider(req,res))
router.put("/update-slider/:id",upload.single("image"),(req,res)=>sliderController.editSlider(req,res))

export default router;