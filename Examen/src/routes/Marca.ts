import { Router } from "express";
import MarcaController from "../controller/MarcaController";

const routes = Router();

routes.get("/:id", MarcaController.getById);
routes.post("", MarcaController.add);
routes.patch("", MarcaController.update);
routes.delete("/:id", MarcaController.delete);

export default routes;