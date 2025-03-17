import { Roles } from "src/enum/validadorRoles";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    nombre: string
    
    @Column()
    apellido: string

    @Column({unique : true , nullable   : false })
    email: string

    @Column({ unique : true ,  nullable : false})
    password: string

    @Column('bool',{default : true})
    IsActive : boolean;

    @Column({ type: 'enum', enum: Roles, default : Roles.user})
    role: Roles

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}
