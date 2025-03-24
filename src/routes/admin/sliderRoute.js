import express from "express";
import SliderController from "../../controllers/sliderController.js";
import SliderService from "../../services/sliderService.js";
import Repositorys from "../../repositories/repositorys.js";
import upload from "../../utils/multer.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";

const router = express.Router();
const sliderController = new SliderController(new SliderService(new Repositorys())); 

router.post("/add-slider",verifyJwtToken,upload.single("image"),(req, res) => sliderController.addSlider(req, res)); 
router.get("/slider-details",verifyJwtToken, (req,res)=>sliderController.getSlider(req,res))
router.delete("/delete-slider/:id",verifyJwtToken, (req,res)=>sliderController.deleteSlider(req,res))
router.put("/update-slider/:id",verifyJwtToken,upload.single("image"),(req,res)=>sliderController.editSlider(req,res))

export default router;