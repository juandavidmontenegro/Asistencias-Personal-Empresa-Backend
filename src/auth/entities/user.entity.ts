import { Roles } from "src/enum/validadorRoles";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ type: 'enum', enum: Roles, default : Roles.admin})
    role: Roles

   @UpdateDateColumn( { type: 'timestamp', default: () => "CURRENT_TIMESTAMP(0)", onUpdate : "CURRENT_TIMESTAMP(0)" })
   created_at: Date;

}
