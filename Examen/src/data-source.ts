import "reflect-metadata"
import { DataSource } from "typeorm"
import { Producto } from "./entity/Producto"
import { Usuarios } from "./entity/Usuario"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "1234",
    database: "bdExamen",
    synchronize: true,
    logging: false,
    entities: [Producto, Usuarios],
    migrations: [],
    subscribers: [],
})
