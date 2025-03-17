
import { Type } from "class-transformer";
import {  IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { EstadoEntradasPersonal } from "src/enum/estadoEntrada";
import { Timestamp } from "typeorm";


export class CreateAsistenciaPersonDto{

    


    @IsNumber()
    cedula: number;
   // @IsNotEmpty()
   // @IsDateString()  // Valida que el valor sea una cadena de fecha válida en formato ISO 8601
   // @Type(() => Date)  // Convierte la cadena ISO a una instancia de Date
   // fecha: Date;

   // @IsNotEmpty()
   // @IsDateString()  // Valida que el valor sea una cadena de fecha válida en formato ISO 8601
   // @Type(() => time)  // Convierte la cadena ISO a una instancia de Date
    //hora: Date;

    @IsOptional()
    @IsEnum(EstadoEntradasPersonal)
    estado?: EstadoEntradasPersonal;
    

    

}