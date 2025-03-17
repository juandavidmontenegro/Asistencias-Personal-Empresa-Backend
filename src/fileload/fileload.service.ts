import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { Fileload } from './entities/fileload.entity';

@Injectable()
export class FileloadService {    
  private readonly logger = new Logger(FileloadService.name);
  
  constructor(
    @InjectRepository(Fileload) 
    private readonly fileloadRepository: Repository<Fileload>
  ){}

  async registerfile(file: Express.Multer.File) {
    try {
      // Validar archivo
      if (!file) {
        throw new BadRequestException('No se ha proporcionado un archivo');
      }

      // Validar extensión
      const validExtensions = ['.xlsx', '.xls'];
      const fileExtension = file.originalname.toLowerCase().slice(
        file.originalname.lastIndexOf('.')
      );
      
      if (!validExtensions.includes(fileExtension)) {
        throw new BadRequestException('Solo se permiten archivos Excel (.xlsx, .xls)');
      }

      // Leer archivo Excel
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // Primera hoja
      
      // Convertir a JSON
      const data = XLSX.utils.sheet_to_json(worksheet);
      
      if (!data.length) {
        throw new BadRequestException('El archivo está vacío');
      }

      // Guardar datos
      const registros = await this.fileloadRepository.save(
        data.map((row : any) => ({
          modelo: row['modelo'] || row['MODELO'] || '',
          serie: row['serie'] || row['SERIE'] || '',
          marca: row['marca'] || row['MARCA'] || '',
          fechaEntrada: new Date()
        }))
      );
      return {
        message: '✅ Archivo procesado exitosamente',
        detalles: {
          nombreArchivo: file.originalname,
          registrosGuardados: registros
        }
      };

    } catch (error) {
      this.logger.error(`Error procesando archivo: ${error.message}`);
      throw new BadRequestException(`Error al procesar el archivo: ${error.message}`);
    }
  }
}