import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fileload {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelo: string;

  @Column()
  serie: string;

  @Column()
  marca: string;

  @Column({ type: 'timestamp' })
  fechaEntrada: Date;


}
