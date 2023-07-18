import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Marca } from "../entity/Marca";
import { validate } from "class-validator";

class MarcaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const MarcaRepo = AppDataSource.getRepository(Marca);

      const listaMarca = await MarcaRepo.find({
        where: { estado: true },
      });

      if (listaMarca.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaMarca);
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

      const MarcaRepo = AppDataSource.getRepository(Marca);

      let marca;
      try {
        marca = await MarcaRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      return resp.status(200).json(marca);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { id, nombre, metalizado} = req.body;

      //validacion de datos de entrada
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }
      if (!nombre) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el nombre de la marca" });
      }
      if (!metalizado) {
        return resp.status(404).json({ mensaje: "Debe indicar el metalizado" });
      }

      //validacion de reglas de negocio
      const MarcaRepo = AppDataSource.getRepository(Marca);
      const Marc = await MarcaRepo.findOne({ where: { id } });

      if (Marc) {
        return resp
          .status(404)
          .json({ mensaje: "La marca ya existe en la base datos." });
      }
      let marca = new Marca();
      marca.id = id;
      marca.nombre = nombre;
      marca.metalizado = metalizado;
      marca.estado = true;

      //validar con class validator
      const errors = await validate(marca, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await MarcaRepo.save(marca);
      return resp.status(201).json({ mensaje: "Producto creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { id, nombre, metalizado, estado} = req.body;

    //validacion de datos de entrada
    if (!id) {
      return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    }
    if (!nombre) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del producto" });
    }
    if (!metalizado) {
      return resp.status(404).json({ mensaje: "Debe indicar el metalizado" });
    }
    if (!estado) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el estado" });
    }

    //validacion de reglas de negocio
    const MarcaRepo = AppDataSource.getRepository(Marca);
    let Marc: Marca;
    try {
      Marc = await MarcaRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto." });
    }

    Marc.nombre = nombre;
    Marc.metalizado = metalizado;
    Marc.estado = estado;
    // pro.fechaIngreso

    //validar con class validator
    const errors = await validate(Marc, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await MarcaRepo.save(Marc);
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

      const MarcaRepo = AppDataSource.getRepository(Marca);
      let Marc: Marca;
      try {
        Marc = await MarcaRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra el producto con ese ID" });
      }

      Marc.estado = false;
      try {
        await MarcaRepo.save(Marc);
        return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default MarcaController;
