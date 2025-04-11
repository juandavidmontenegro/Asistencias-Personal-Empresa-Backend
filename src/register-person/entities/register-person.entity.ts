
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(() => AsistenciaPersonal, (asistencia) => asistencia.registerPerson)
    asistencias: AsistenciaPersonal[];

    @OneToMany(() => AsistenciaPersonalExit, (asistenciaexits) => asistenciaexits.registerPerson)
    asistenciasexits: AsistenciaPersonalExit[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(0)"})
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(0)", onUpdate: "CURRENT_TIMESTAMP(0)" })
    updated_at: Date;
    exitTime: Date;


}
