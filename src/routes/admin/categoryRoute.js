import express from "express";
import categoryController from "../../controllers/categoryController.js";
import categoryService from "../../services/categoryService.js";
import Repositorys from "../../repositories/repositorys.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";


const router = express.Router();
const CategoryController = new categoryController(new categoryService(new Repositorys));

router.post("/create-business", (req, res) => CategoryController.createBusiness(req, res));
router.post("/create-product", (req, res) => CategoryController.createProduct(req, res));
router.post("/create-service", (req, res) => CategoryController.createService(req, res));
router.get("/get-service", (req, res) => CategoryController.getServices(req, res));
router.get("/get-product", (req, res) => CategoryController.getProducts(req, res));
router.get("/get-business", (req, res) => CategoryController.getBusiness(req, res));
router.delete("/delete-business/:businessId", (req, res) => CategoryController.deleteBusiness(req, res));
router.delete("/delete-service/:serviceId", (req, res) => CategoryController.deleteService(req, res));
router.delete("/delete-product/:productId", (req, res) => CategoryController.deleteProduct(req, res));

export default router;