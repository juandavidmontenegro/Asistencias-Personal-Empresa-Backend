import { IsDate } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegisterPerson } from "./register-person.entity";
import { EstadoEntradasPersonal } from "src/enum/estadoEntrada";

@Entity()
export class AsistenciaPersonal{

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('int' , {nullable : false})
    cedula: number;
    
    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_TIMESTAMP(0)'})
    fechaEntrada: Date;

    @CreateDateColumn({ type :'time', default :()=> 'CURRENT_TIMESTAMP(0)'})
    horaEntrada: Date;

    @Column({ type: 'enum', enum: EstadoEntradasPersonal, default: EstadoEntradasPersonal.ACTIVO }) // Campo para el estado
    estado: EstadoEntradasPersonal; // Este es el campo para el estado de la entrada/salida

    @ManyToOne(() => RegisterPerson, (registerPerson) => registerPerson.asistencias)
    @JoinColumn({ name: 'registerPersonId' }) // Relación con RegisterPerson usando cedula
    registerPerson: RegisterPerson;
    

}
