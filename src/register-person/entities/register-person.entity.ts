
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AsistenciaPersonal } from "./attendance.entity";
import { AsistenciaPersonalExit } from "./attendance-exit.entity";

@Entity()
export class RegisterPerson {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text' , {nullable : false})
    cedula: string;

    @Column('text',{ nullable: false})
    nombrecompleto : string;

    @Column('text',{ nullable: false})
    empresa : string;

    @Column('text',{ nullable: false})
    cargo: string;

    @Column('text',{ nullable: false})
    jefeInmediato: string;

    @Column('text', { nullable: false})
    correo: string;

    @Column({ default: true })
    estado: boolean;

    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(0)"})
    created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(0)", onUpdate: "CURRENT_TIMESTAMP(0)" })
    updated_at: Date;
    
    @Column({ type: "timestamp", nullable: true })
    exitTime: Date;
    
    @OneToMany(() => AsistenciaPersonal, (asistencia) => asistencia.registerPerson)
    asistencias: AsistenciaPersonal[];

    @OneToMany(() => AsistenciaPersonalExit, (asistenciaexits) => asistenciaexits.registerPerson)
    asistenciasexits: AsistenciaPersonalExit[];


}
