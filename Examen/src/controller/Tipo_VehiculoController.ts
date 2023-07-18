import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tipo_Vehiculo } from "../entity/Tipo_Vehiculo";
import { validate } from "class-validator";

class Tipo_VehiculoController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const Tipo_VehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);

      const listaTipo_Vehiculo = await Tipo_VehiculoRepo.find({
        where: { estado: true },
      });

      if (listaTipo_Vehiculo.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaTipo_Vehiculo);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);

      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const Tipo_VehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);

      let tipo_Vehiculo;
      try {
        tipo_Vehiculo = await Tipo_VehiculoRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el tipo con ese ID" });
      }

      return resp.status(200).json(tipo_Vehiculo);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { id, nombre} = req.body;

      //validacion de datos de entrada
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }
      if (!nombre) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Tipo del Vehiculo" });
      }
      

      //validacion de reglas de negocio
      const Tipo_VehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      const tipo = await Tipo_VehiculoRepo.findOne({ where: { id } });

      if (tipo) {
        return resp
          .status(404)
          .json({ mensaje: "El producto ya existe en la base datos." });
      }

      const fecha = new Date();

      let tipo_Vehiculo = new Tipo_Vehiculo();
      tipo_Vehiculo.id = id;
      tipo_Vehiculo.nombre = nombre;
      tipo_Vehiculo.estado = true;

      //validar con class validator
      const errors = await validate(tipo_Vehiculo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await Tipo_VehiculoRepo.save(tipo_Vehiculo);
      return resp.status(201).json({ mensaje: "Producto creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { id, nombre} = req.body;

    //validacion de datos de entrada
    if (!id) {
      return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    }
    if (!nombre) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del producto" });
    }

    //validacion de reglas de negocio
    const Tipo_VehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
    let tipo: Tipo_Vehiculo;
    try {
      tipo = await Tipo_VehiculoRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto." });
    }

    tipo.nombre = nombre;
    // pro.fechaIngreso

    //validar con class validator
    const errors = await validate(tipo, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await Tipo_VehiculoRepo.save(tipo);
      return resp.status(200).json({ mensaje: "Se guardo correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "No pudo guardar." });
    }
  };
  static delete = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }

      const Tipo_VehiculoRepo = AppDataSource.getRepository(Tipo_Vehiculo);
      let tipo: Tipo_Vehiculo;
      try {
        tipo = await Tipo_VehiculoRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra el Tipo Vehiculo con ese ID" });
      }

      tipo.estado = false;
      try {
        await Tipo_VehiculoRepo.save(tipo);
        return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default Tipo_VehiculoController;
