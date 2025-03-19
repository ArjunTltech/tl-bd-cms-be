import express from "express";
import SliderController from "../../controllers/sliderController.js";
import SliderService from "../../services/sliderService.js";
import Repositorys from "../../repositories/repositorys.js";
import upload from "../../utils/multer.js";
import verifyToken from "../../utils/verifyToken.js";

const router = express.Router();
const sliderController = new SliderController(new SliderService(new Repositorys())); 

router.post("/add-slider",verifyToken,upload.single("logo"),(req, res) => sliderController.addSlider(req, res)); 
router.get("/slider-details",verifyToken,(req,res)=>sliderController.getSlider(req,res))
export default router;