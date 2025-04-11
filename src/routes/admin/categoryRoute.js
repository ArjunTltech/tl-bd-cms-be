import express from "express";
import categoryController from "../../controllers/categoryController.js";
import categoryService from "../../services/categoryService.js";
import Repositorys from "../../repositories/repositorys.js";
import verifyJwtToken from "../../middlewares/verifyJwtToken.js";


const router = express.Router();
const CategoryController = new categoryController(new categoryService(new Repositorys));

router.post("/create-business",verifyJwtToken,(req, res) => CategoryController.createBusiness(req, res));
router.post("/create-product",verifyJwtToken, (req, res) => CategoryController.createProduct(req, res));
router.post("/create-service",verifyJwtToken, (req, res) => CategoryController.createService(req, res));
router.get("/get-service",verifyJwtToken, (req, res) => CategoryController.getServices(req, res));
router.get("/get-product",verifyJwtToken, (req, res) => CategoryController.getProducts(req, res));
router.get("/get-business",verifyJwtToken, (req, res) => CategoryController.getBusiness(req, res));
router.delete("/delete-business/:businessId",verifyJwtToken, (req, res) => CategoryController.deleteBusiness(req, res));
router.delete("/delete-service/:serviceId",verifyJwtToken, (req, res) => CategoryController.deleteService(req, res));
router.delete("/delete-product/:productId",verifyJwtToken, (req, res) => CategoryController.deleteProduct(req, res));
router.put("/update-product/:productId",verifyJwtToken, (req, res) => CategoryController.editProduct(req, res));
router.put("/update-service/:serviceId",verifyJwtToken,     (req, res) => CategoryController.editService(req, res));
router.put("/update-business/:businessId",verifyJwtToken, (req, res) => CategoryController.editBusiness(req, res));

export default router;