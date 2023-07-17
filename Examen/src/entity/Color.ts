import { Column,IsNotEmpty, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Color{

    @PrimaryColumn()
    @IsNotEmpty({ message: "Falta la identificacion del color" })    
    id: number

    @Column({ length: 50 })
    @IsNotEmpty({ message: "Falta el nombre del color" })  
    nombre: string

    @Column({})
    estado: boolean

}
