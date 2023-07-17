import { Column,IsNotEmpty, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Marca{

    @PrimaryColumn()
    @IsNotEmpty({ message: "Falta la identificacion de la marca" })  
    id: number

    @Column({ length: 50 })
    @IsNotEmpty({ message: "Falta el nombre de la marca" })  
    nombre: string

    @Column({})
    metalizado: boolean

    @Column({})
    estado: boolean

}