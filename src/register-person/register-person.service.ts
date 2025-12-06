import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegisterPersonDto } from './dto/create-register-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterPerson } from './entities/register-person.entity';
import { ILike, IsNull, Not, Repository } from 'typeorm';
import { AsistenciaPersonal } from './entities/attendance.entity';
import { CreateAsistenciaPersonDto } from './dto/create-asistencia-person.dto';
import { AsistenciaPersonalExit } from './entities/attendance-exit.entity';
import { CreateAsistenciaPersonExitDto } from './dto/create-asistencia-personexit.dto';
import { EstadoEntradasPersonal } from 'src/enum/estadoEntrada';
import { Boletas } from 'src/enum/validatorboletas';

@Injectable()
export class RegisterPersonService {

  constructor(@InjectRepository(AsistenciaPersonal) private readonly asistenciaPersonalRepository: Repository<AsistenciaPersonal>,
  @InjectRepository(AsistenciaPersonalExit) private readonly asistenciaPersonalExitRepository: Repository<AsistenciaPersonalExit>,
    @InjectRepository(RegisterPerson) private readonly registerpersonRepository : Repository<RegisterPerson>){}

    //registro de empleado
    async create(createRegisterPersonDto: CreateRegisterPersonDto) {
      try {
        const { cedula, correo } = createRegisterPersonDto;
        // Validar si existe un usuario con la misma cédula
        const existingUserByCedula = await this.registerpersonRepository.findOneBy({ cedula });
        if (existingUserByCedula) {
          throw new ConflictException(`Ya existe un usuario registrado con la cédula: ${cedula}`);
        }
        // Validar si existe un usuario con el mismo correo
        const existingUserByEmail = await this.registerpersonRepository.findOneBy({ correo });
        if (existingUserByEmail) {
          throw new ConflictException(`Ya existe un usuario registrado con el correo: ${correo}`);
        }
        // Crear el nuevo registro
        const registerPerson = this.registerpersonRepository.create({
          ...createRegisterPersonDto,
          //fechaRegistro : new Date(), // Agregar fecha de registro
          estado: true // Estado activo por defecto
        });
        const savedUser = await this.registerpersonRepository.save(registerPerson);
        return {
          message: 'Usuario creado exitosamente',
            persona: {
           // id: savedUser.id,
            cedula: savedUser.cedula,
            nombrecompleto: savedUser.nombrecompleto,
            empresa: savedUser.empresa,
            cargo: savedUser.cargo,
            //fechaRegistro: savedUser.fechaRegistro,
            //estado: savedUser.estado,
            correo: savedUser.correo,
            jefeInmediato: savedUser.jefeInmediato
          }
        };
      } catch (error) {
        if (error instanceof ConflictException || error instanceof BadRequestException) {
          throw error;
        }
        throw new BadRequestException('Error al crear el usuario: ' + error.message);
      }
    }
  // REGISTRO DE PERSONAL DE INGRESO
    async attendances(createAsistenciaPersonDto: CreateAsistenciaPersonDto) {
      try {
        const { cedula, observacion } = createAsistenciaPersonDto;
  
        // Buscar empleado
        const registerPerson = await this.registerpersonRepository.findOne({
          where: { 
            cedula,
            estado: true 
          },
          relations: ['asistenciasexits'],
          select: ['id', 'cedula', 'nombrecompleto', 'asistenciasexits'],
        });
  
        if (!registerPerson) {
          throw new BadRequestException(
            `Empleado no encontrado o inactivo. Cédula: ${cedula}`
          );
        }
  
        // Verificar si ya tiene una entrada activa
        const entradaActiva = await this.asistenciaPersonalRepository.findOne({
          where: {
            cedula,
            estado: EstadoEntradasPersonal.ACTIVO
          }
        });
  
        if (entradaActiva) {
          throw new BadRequestException(
            `El empleado ${registerPerson.nombrecompleto} ya tiene una entrada activa`
          );
        }
  
        // Buscar última salida para validación
        const ultimaSalida = await this.findLastExit(cedula);
  
        // Validar observación si viene de cita médica
        if (ultimaSalida?.tipo_de_salida === Boletas.enfermeria && !observacion) {
          throw new BadRequestException(
            'Se requiere una observación al regresar de cita médica'
          );
        }
  
        // Crear registro de entrada
        const asistenciaPersonal = this.asistenciaPersonalRepository.create({
          cedula,
          registerPerson,
          estado: EstadoEntradasPersonal.ACTIVO,
          observacion: observacion || undefined,
        });
  
        const savedAttendance = await this.asistenciaPersonalRepository.save(asistenciaPersonal);
  
        // Retornar respuesta
        return {
          message: 'Entrada registrada correctamente',
          asistencia: {
            id: savedAttendance.id,
            cedula: savedAttendance.cedula,
            nombrecompleto: registerPerson.nombrecompleto,
            fechaEntrada: savedAttendance.fechaEntrada,
            horaEntrada: savedAttendance.horaEntrada,
            estado: savedAttendance.estado,
            observacion: savedAttendance.observacion,
            ultima_salida: ultimaSalida ? {
              tipo_salida: ultimaSalida.tipo_de_salida,
              fecha_salida: ultimaSalida.fechaSalida,
              fecha_boleta: ultimaSalida.fechaboleta
            } : null
          }
        };
  
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new BadRequestException(
          `Error al registrar la entrada: ${error.message}`
        );
      }
  }

  // metodo de validacion de las boletas
  async findLastExit(cedula: string) {
    try {
      return await this.asistenciaPersonalExitRepository.findOne({
        where: { cedula },
        order: { 
          fechaSalida: 'DESC',
          horaSalida: 'DESC'
        }
      });
    } catch (error) {
      console.error('Error al buscar la última salida:', error);
      return null;
    }
  }


  
  // salidas del personal con boleta
  async attendancesexit(createAsistenciaPersonExitDto: CreateAsistenciaPersonExitDto) {
    try {
      const { cedula, boleta , fechaboleta } = createAsistenciaPersonExitDto;
  
  
      // Validar que la boleta no esté vacía
      if (!boleta || boleta.trim() === '') {
        throw new BadRequestException('la boleta de salida es requerida para registrar la salida');
      }
      // Validar fecha de boleta según el tipo
      const boletasConFecha = [
        Boletas.enfermeria,
        Boletas.dia_compensado,
        Boletas.dia_no_remunerado,
        Boletas.remito_enfermeria
      ];
      // Validar fecha de boleta para tipos específicos
    if (boletasConFecha.includes(boleta)) {
      if (!fechaboleta) {
        throw new BadRequestException(
          `La fecha de la boleta es requerida para el tipo de salida: ${boleta}`
        );
      }
      // Validar que la fecha no sea anterior a la fecha actual
      const fechaActual = new Date();
      const fechaBoleta = new Date(fechaboleta);
      
      if (fechaBoleta < fechaActual) {
        throw new BadRequestException(
          'La fecha de la boleta no puede ser anterior a la fecha actual'
        );
      }
    }
  
      // Buscar empleado con sus datos necesarios
      const registerPerson = await this.registerpersonRepository.findOne({
        where: { 
          cedula,
          estado: true // Validar que el empleado esté activo
        },
        relations: ['asistenciasexits'],
        select: ['id', 'cedula', 'nombrecompleto', 'asistenciasexits'],
      });
  
      if (!registerPerson) {
        throw new BadRequestException(
          `Empleado no encontrado o inactivo. Cédula: ${cedula}`
        );
      }
  
      // Verificar entrada activa
      const asistenciaEntrada = await this.asistenciaPersonalRepository.findOne({
        where: {
          registerPerson: { cedula },
          estado: EstadoEntradasPersonal.ACTIVO,
        },
        relations: ['registerPerson']
      });
  
      if (!asistenciaEntrada) {
        throw new BadRequestException(
          `No hay una entrada activa registrada para el empleado: ${registerPerson.nombrecompleto}`
        );
      }
      // Crear registro de salida
      const asistenciaPersonalExit = this.asistenciaPersonalExitRepository.create({
        tipo_de_salida: boleta, // Cambiar a nombre de propiedad correcto según la entidad
        cedula,
        registerPerson,
        fechaboleta: boletasConFecha.includes(boleta) && fechaboleta ? new Date(fechaboleta) : undefined
      });
      // Actualizar estado de la entrada
      asistenciaEntrada.estado = EstadoEntradasPersonal.INACTIVO;
      // Guardar cambios en transacción
      await this.asistenciaPersonalExitRepository.manager.transaction(async (transactionEntityManager) => {
        await transactionEntityManager.save(asistenciaPersonalExit);
        await transactionEntityManager.save(asistenciaEntrada);
      });
  
      return {
        message: 'Salida registrada correctamente',
        asistenciasalida: {
          id: asistenciaPersonalExit.id,
          cedula: asistenciaPersonalExit.cedula,
          nombrecompleto: registerPerson.nombrecompleto,
          tipo_de_salida: asistenciaPersonalExit.tipo_de_salida,
          fechaSalida: asistenciaPersonalExit.fechaSalida,
          horaSalida: asistenciaPersonalExit.horaSalida,
          fechaboleta : asistenciaPersonalExit.fechaboleta
      
        }
      };
  
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Error al registrar la salida: ${error.message}`);
    }
  }

  

//obtener los registros de assitecia y asistenciasexit de los empleados
async findAll(page: number = 1, limit: number = 10) {
  try {
    // Obtener usuarios que tienen al menos una asistencia o salida
    const users = await this.registerpersonRepository.find({
      relations: ['asistencias', 'asistenciasexits'],
      where: [
        { asistencias: { id: Not(IsNull()) } },
        { asistenciasexits: { id: Not(IsNull()) } }
      ],
      select: {
        id: true,
        cedula: true,
        nombrecompleto: true,
        asistencias: {
          fechaEntrada: true,
          horaEntrada: true,
          estado: true,
          observacion : true
        },
        asistenciasexits: {
          fechaSalida: true,
          horaSalida: true,
          tipo_de_salida: true,
          fechaboleta : true
        }
      }
    });

    // Filtrar usuarios que realmente tienen registros
    const usuariosConRegistros = users.filter(user => 
      user.asistencias.length > 0 || user.asistenciasexits.length > 0
    );

    return {
      message: 'Registros de asistencia obtenidos correctamente',
      
        usuarios: usuariosConRegistros.map(user => ({
          id: user.id,
          cedula: user.cedula,
          nombrecompleto: user.nombrecompleto,
          ingreso: user.asistencias,
          salidas: user.asistenciasexits
        })),
        totalRegistros: usuariosConRegistros.length,
        paginacion: {
          pagina: page,
          limitePorPagina: limit
        }
      }
    }
   catch (error) {
    throw new BadRequestException('Error al obtener los registros de asistencia: ' + error.message);
  }
}
////////////////////////////////////////////
// ELEMINAR UNA ASISTENCIA DEL EMPLEADO POR ID.
async deleteSpecificAttendance(asistenciaId: string) {
  try {
    // Validar formato del ID
    if (!asistenciaId || asistenciaId.trim() === '') {
      throw new BadRequestException('El ID de asistencia es requerido');
    }

    // Buscar la asistencia con todas sus relaciones necesarias
    const asistencia = await this.asistenciaPersonalRepository.findOne({
      where: { id: asistenciaId },
      relations: ['registerPerson'],
      select: {
        id: true,
        cedula: true,
        fechaEntrada: true,
        horaEntrada: true,
        estado: true,
        registerPerson: {
          id: true,
          cedula: true,
          nombrecompleto: true
        }
      }
    });

    if (!asistencia) {
      throw new BadRequestException(`No se encontró la asistencia con ID: ${asistenciaId}`);
    }

    // Buscar la salida relacionada con validación de fecha
    const salidaRelacionada = await this.asistenciaPersonalExitRepository.findOne({
      where: {
        registerPerson: { id: asistencia.registerPerson.id },
        fechaSalida: asistencia.fechaEntrada
      },
      select: {
        id: true,
        fechaSalida: true,
        horaSalida: true,
        tipo_de_salida: true
      }
    });

    // Preparar información para el registro de eliminación
    const infoEliminacion = {
      empleado: {
        id: asistencia.registerPerson.id,
        cedula: asistencia.registerPerson.cedula,
        nombrecompleto: asistencia.registerPerson.nombrecompleto
      },
      asistencia: {
        id: asistencia.id,
        fecha: asistencia.fechaEntrada,
        hora: asistencia.horaEntrada,
        estado: asistencia.estado
      },
      salidaEliminada: salidaRelacionada ? {
        id: salidaRelacionada.id,
        fecha: salidaRelacionada.fechaSalida,
        hora: salidaRelacionada.horaSalida,
        tipo: salidaRelacionada.tipo_de_salida
      } : null
    };

    // Ejecutar eliminación en una transacción
    await this.asistenciaPersonalRepository.manager.transaction(
      async (transactionEntityManager) => {
        // Eliminar salida si existe
        if (salidaRelacionada) {
          const resultSalida = await transactionEntityManager.delete(
            AsistenciaPersonalExit,
            { id: salidaRelacionada.id }
          );
          if (resultSalida.affected === 0) {
            throw new Error('No se pudo eliminar el registro de salida');
          }
        }

        // Eliminar entrada
        const resultEntrada = await transactionEntityManager.delete(
          AsistenciaPersonal,
          { id: asistenciaId }
        );
        if (resultEntrada.affected === 0) {
          throw new Error('No se pudo eliminar el registro de entrada');
        }
      }
    );

    return {
      message: 'Registros eliminados correctamente',
      detalle: infoEliminacion,

    };

  } catch (error) {
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new BadRequestException(
      `Error al eliminar los registros: ${error.message}`
    );
  }
}

// obtener los registros de todos los empleados de la empresa
async empleados(page: number = 1, limit: number = 10, filtro?: string) {
  try {
    const skip = (page - 1) * limit;

    // Crear query builder base
    const queryBuilder = this.registerpersonRepository.createQueryBuilder('empleado')
      .where('empleado.estado = :estado', { estado: true });

    // Obtener total de registros para la paginación
    const total = await queryBuilder.getCount();
    // Obtener empleados paginados
    const empleados = await queryBuilder
      .select([
        'empleado.id',
        'empleado.cedula',
        'empleado.nombrecompleto',
        'empleado.empresa',
        'empleado.cargo',
        'empleado.correo',
        'empleado.jefeInmediato',
        'empleado.created_at'
      ])
      .orderBy('empleado.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();

    // Calcular páginas totales
    const totalPaginas = Math.ceil(total / limit);

    return {
      message: 'Empleados obtenidos correctamente',
     
        empleados,
        paginacion: {
          total,
          paginaActual: page,
          totalPaginas,
          
        }
    };
  } catch (error) {
    throw new BadRequestException(
      `Error al obtener los empleados: ${error.message}`
    );
  }
}

//eliminar un empleado del registro de empleados
async findbyEmpleados( ){}

async findByCompanies() {
  try {
    const empresas = [
      'industrial aceitera de casanare',
      'agroindustrial de palma aceitera',
      'visitantes'
    ];

    const resultados = await Promise.all(
      empresas.map(async (empresa) => {
        const employees = await this.registerpersonRepository.find({
          where: {
            empresa: ILike(`%${empresa}%`),
            estado: true
          },
          select: {
            id: true,
            cedula: true,
            nombrecompleto: true,
            empresa: true,
            cargo: true,
            jefeInmediato: true,
            correo: true,
            created_at: true
          },
          order: {
            nombrecompleto: 'ASC'
          }
        });

        return {
          empresa,
          total: employees.length,
        };
      })
    );

    return {
      message: 'Empleados encontrados exitosamente',
      datos: resultados.map(result => ({
        empresa: result.empresa.toUpperCase(),
        total_empleados: result.total,
      }))
    };
  } catch (error) {
    throw new BadRequestException('Error al buscar empleados: ' + error.message);
  }
}




}





