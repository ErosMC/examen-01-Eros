import { Router } from "express";
import ColorController from "../controller/ColorController";

const routes = Router();

routes.get("/:id", ColorController.getById);
routes.post("", ColorController.add);
routes.delete("/:id", ColorController.delete);

export default routes;