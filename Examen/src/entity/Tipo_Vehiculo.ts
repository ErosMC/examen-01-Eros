import { Column,IsNotEmpty, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Tipo_Vehiculo{

    @PrimaryColumn()  
    id: number
    @IsNotEmpty({ message: "Falta la identificacion" })  

    @Column({ length: 50 })
    @IsNotEmpty({ message: "Falta el nombre del vehiculo" })  
    nombre: string

    @Column({})
    estado: boolean

}
