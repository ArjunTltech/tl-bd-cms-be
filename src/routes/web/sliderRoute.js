import express from "express";
import sliderController from "../../controllers/sliderController.js";
import sliderService from "../../services/sliderService.js";
import Repositorys from "../../repositories/repositorys.js";

const router = express.Router();
const SliderController = new sliderController(new sliderService(new Repositorys)); 

router.get("/get-all-sliders",(req,res)=>SliderController.getSlider(req,res))
export default router;