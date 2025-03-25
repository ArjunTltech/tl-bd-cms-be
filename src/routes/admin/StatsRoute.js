import express from "express";
import Repositorys from "../../repositories/repositorys.js";
import StatsService from "../../services/statsService.js";
import StatsController from "../../controllers/statsController.js";



const router = express.Router();
const statstController = new StatsController(new StatsService(new Repositorys));

router.get("/total-counts", (req, res) => statstController.totalCounts(req, res));
router.get("/enquiry-stats", (req, res) => statstController.enquiryStats(req, res));


export default router;