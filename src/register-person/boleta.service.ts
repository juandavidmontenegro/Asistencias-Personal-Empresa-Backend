import { Injectable } from '@nestjs/common';
import { RegisterPersonService } from './register-person.service';
import { Boletas } from 'src/enum/validatorboletas';
import { AsistenciaPersonalExit } from './entities/attendance-exit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ObservacionValidator {
  constructor(
    @InjectRepository(AsistenciaPersonalExit)
    private readonly exitRepository: Repository<AsistenciaPersonalExit>
  ) {}

  async validateObservacion(cedula: number): Promise<boolean> {
    const ultimaSalida = await this.exitRepository.findOne({
      where: { cedula },
      order: { 
        fechaSalida: 'DESC',
        horaSalida: 'DESC'
      }
    });

    return !!(ultimaSalida && 
      ultimaSalida.tipo_de_salida === Boletas.enfermeria && 
      ultimaSalida.fechaboleta);
  }
}