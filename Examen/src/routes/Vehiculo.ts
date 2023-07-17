import { Router } from "express";
import VehiculoController from "../controller/VehiculoController";

const routes = Router();

routes.get("/:id", VehiculoController.getById);
routes.post("", VehiculoController.add);
routes.patch("", VehiculoController.update);
routes.delete("/:id", VehiculoController.delete);
export default routes;