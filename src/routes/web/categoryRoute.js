import CategoryController from "../../controllers/categoryController.js";
import Repositorys from "../../repositories/repositorys.js";
import CategoryService from "../../services/categoryService.js";
import express from 'express'


const router = express.Router();
const categoryController = new CategoryController(new CategoryService(new Repositorys));


router.get("/get-service", (req, res) => categoryController.getServices(req, res));
router.get("/get-product", (req, res) => categoryController.getProducts(req, res));
router.get("/get-business", (req, res) => categoryController.getBusiness(req, res));

export default router;