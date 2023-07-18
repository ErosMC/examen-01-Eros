import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Color } from "../entity/Color";
import { validate } from "class-validator";

class ColorController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const ColorRepo = AppDataSource.getRepository(Color);

      const listaColor = await ColorRepo.find({
        where: { estado: true },
      });

      if (listaColor.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaColor);
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

      const ColorRepo = AppDataSource.getRepository(Color);

      let color;
      try {
        color = await ColorRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      return resp.status(200).json(color);
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
          .json({ mensaje: "Debe indicar el nombre del producto" });
      }

     

      //validacion de reglas de negocio
      const ColorRepo = AppDataSource.getRepository(Color);
      const Colo = await ColorRepo.findOne({ where: { id } });

      if (Colo) {
        return resp
          .status(404)
          .json({ mensaje: "El Color ya existe en la base datos." });
      }

      let color = new Color();
      color.id = id;
      color.nombre = nombre;
      color.estado = true;


      //validar con class validator
      const errors = await validate(color, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await ColorRepo.save(color);
      return resp.status(201).json({ mensaje: "Color creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { id, nombre, estado } = req.body;

    //validacion de datos de entrada
    if (!id) {
      return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    }
    if (!nombre) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del producto" });
    }
    if (!estado) {
      return resp.status(404).json({ mensaje: "Debe indicar el estado" });
    }
 

    //validacion de reglas de negocio
    const ColorRepo = AppDataSource.getRepository(Color);
    let Colo : Color;
    try {
      Colo = await ColorRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto." });
    }

    Colo.nombre = nombre;
    Colo.estado = estado;

    // pro.fechaIngreso

    //validar con class validator
    const errors = await validate(Colo, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await ColorRepo.save(Colo);
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

      const ColorRepo = AppDataSource.getRepository(Color);
      let Colo: Color;
      try {
        Colo = await ColorRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra el producto con ese ID" });
      }

      Colo.estado = false;
      try {
        await ColorRepo.save(Colo);
        return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default ColorController;
