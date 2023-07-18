import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";
import { validate } from "class-validator";

class VehiculoController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);

      const listaVehiculo = await VehiculoRepo.find({
        where: { estado: true },
      });

      if (listaVehiculo.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaVehiculo);
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

      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);

      let vehiculo;
      try {
        vehiculo = await VehiculoRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el Vehiculo con ese ID" });
      }

      return resp.status(200).json(vehiculo);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { id, Placa, cilindraje, cantidadpasajeros, colorID, MarcaID, Tipo_VehiculoID } = req.body;

      //validacion de datos de entrada
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }
      if (!Placa) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la Placa del vehiculo" });
      }
      if (!cilindraje) {
        return resp.status(404).json({ mensaje: "Debe indicar el cilindraje" });
      }
      if (!cantidadpasajeros) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar la cantidad de pasajeros" });
      }
      if (!colorID) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el colorID del vehiculo" });
      }
      if (!MarcaID) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el MarcaID del vehiculo" });
      }

      if (!Tipo_VehiculoID) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el Tipo_VehiculoID del vehiculo" });
      }

      //validacion de reglas de negocio
      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
      const vehi = await VehiculoRepo.findOne({ where: { id } });

      if (vehi) {
        return resp
          .status(404)
          .json({ mensaje: "El producto ya existe en la base datos." });
      }

      const fecha = new Date();

      let vehiculo = new Vehiculo();
      vehiculo.id = id;
      vehiculo.Placa = Placa;
      vehiculo.cilindraje = cilindraje;
      vehiculo.cantidadpasajeros = cantidadpasajeros;
      vehiculo.colorID = colorID;
      vehiculo.MarcaID = MarcaID;
      vehiculo.Tipo_VehiculoID = Tipo_VehiculoID;
      vehiculo.fecha_ingreso = fecha;
      vehiculo.estado = true;

      //validar con class validator
      const errors = await validate(vehiculo, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await VehiculoRepo.save(vehiculo);
      return resp.status(201).json({ mensaje: "Producto creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    const { id, Placa, cilindraje, cantidadpasajeros, colorID, MarcaID, Tipo_VehiculoID } = req.body;

    //validacion de datos de entrada
    if (!id) {
      return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    }
    if (!Placa) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar la Placa del vehiculo" });
    }
    if (!cilindraje) {
      return resp.status(404).json({ mensaje: "Debe indicar el cilindraje" });
    }
    if (!cantidadpasajeros) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar la cantidad de pasajeros" });
    }
    if (!colorID) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el colorID del vehiculo" });
    }
    if (!MarcaID) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el MarcaID del vehiculo" });
    }

    if (!Tipo_VehiculoID) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el Tipo_VehiculoID del vehiculo" });
    }


    //validacion de reglas de negocio
    const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
    let vehi: Vehiculo;
    try {
      vehi = await VehiculoRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto." });
    }

    vehi.cilindraje = cilindraje;
    vehi.cantidadpasajeros = cantidadpasajeros;
    vehi.colorID = colorID;
    vehi.MarcaID = MarcaID;
    vehi.Tipo_VehiculoID = Tipo_VehiculoID;
    // pro.fechaIngreso

    //validar con class validator
    const errors = await validate(vehi, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await VehiculoRepo.save(vehi);
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

      const VehiculoRepo = AppDataSource.getRepository(Vehiculo);
      let vehi: Vehiculo;
      try {
        vehi = await VehiculoRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra el vehiculo con ese ID" });
      }

      vehi.estado = false;
      try {
        await VehiculoRepo.save(vehi);
        return resp.status(200).json({ mensaje: "Se eliminó correctamente" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default VehiculoController;
