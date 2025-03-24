import express from "express";
import ClientController from "../../controllers/clientController.js";
import ClientService from "../../services/clientService.js";
import Repositorys from "../../repositories/repositorys.js";
import upload from "../../utils/multer.js";


const router = express.Router();
const clientController = new ClientController(new ClientService(new Repositorys));

router.post("/create-client",upload.single("image"), (req, res) => clientController.createClient(req, res));
router.get("/view-clients", (req, res) => clientController.getAllClients(req, res));
router.put("/update-client/:id",upload.single("image"), (req, res) => clientController.updateClient(req, res));
router.delete("/delete-client/:id", (req, res) => clientController.deleteClient(req, res));

export default router;