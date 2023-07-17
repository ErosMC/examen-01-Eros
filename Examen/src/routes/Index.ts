import { Router } from "express";
import Vehiculo from "./Vehiculo";
import Tipo_Vehiculo from "./Tipo_Vehiculo";
import Marca from "./Marca";
import Color from "./Color";
const routes = Router();

routes.use("/productos", Vehiculo);
routes.use("/usuarios", Tipo_Vehiculo);
routes.use("/productos", Marca);
routes.use("/usuarios", Color);

export default routes;
