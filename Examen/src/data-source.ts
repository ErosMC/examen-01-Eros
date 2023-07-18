import "reflect-metadata"
import { DataSource } from "typeorm"
import { Vehiculo } from "./entity/Vehiculo"
import { Tipo_Vehiculo } from "./entity/Tipo_Vehiculo"
import { Marca } from "./entity/Marca"
import { Color } from "./entity/Color"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "bdExamen",
    synchronize: true,
    logging: false,
    entities: [Vehiculo, Tipo_Vehiculo, Marca, Color],
    migrations: [],
    subscribers: [],
})
