import { Router } from "express";
import Tipo_VehiculoController from "../controller/Tipo_VehiculoController";

const routes = Router();

routes.get("/:id", Tipo_VehiculoController.getById);
routes.post("", Tipo_VehiculoController.add);
routes.delete("/:id", Tipo_VehiculoController.delete);

export default routes;