import { Column,IsNotEmpty, Entity, PrimaryColumn, ForeingKey} from "typeorm";
import { Tipo_Vehiculo } from "./Tipo_Vehiculo"
import { Marca } from "./Marca"
import { Color } from "./Color"

@Entity()
export class Vehiculo{

    @PrimaryColumn()
    @IsNotEmpty({ message: "Falta la identificacion del carro" })  
    id: number

    @Column({ length: 50, unique: true })
    @IsNotEmpty({ message: "Falta la placa" })  
    Placa: string

    @Column({ length: 60 })
    @IsNotEmpty({ message: "Falta el cilindraje" })  
    cilindraje: number

    @Column({ length: 500 })
    @IsNotEmpty({ message: "Falta la cantidad de pasajeros" })  
    cantidadpasajeros: number

    @Column({})
    @IsNotEmpty({ message: "Falta la fecha" })  
    fecha_ingreso: Date

    @Column({})
    estado: boolean

    @ForeingKey(()=> Color)
    @Column()
    colorID:number

    @ForeingKey(()=> Marca)
    @Column()
    MarcaID:number
    
    @ForeingKey(()=> Tipo_Vehiculo)
    @Column()
    Tipo_VehiculoID:number

}