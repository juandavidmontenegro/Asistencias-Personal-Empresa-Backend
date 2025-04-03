import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegisterPerson } from "./register-person.entity";
import { Boletas } from "src/enum/validatorboletas";

@Entity()
export class AsistenciaPersonalExit{

     @PrimaryGeneratedColumn('uuid')
     id: string;
     @Column('int' , {nullable : false})
     cedula: number;
    // @PrimaryGeneratedColumn()
    // cedula: number;

    @CreateDateColumn({ type: 'date' , default : ()=> 'CURRENT_TIMESTAMP(0)' })
    fechaSalida: Date;
    
    @CreateDateColumn({ type: 'time', default : ()=> 'CURRENT_TIMESTAMP(0)' })
    horaSalida: Date;

    @Column({ type: 'enum', enum:  Boletas, default : Boletas.termino_de_labor})
    tipo_de_salida : Boletas;

    
    @ManyToOne(() => RegisterPerson, (registerPerson) => registerPerson.asistenciasexits)
    @JoinColumn({ name: 'registerPersonId' }) // Relación con RegisterPerson usando cedula
    registerPerson: RegisterPerson;

}