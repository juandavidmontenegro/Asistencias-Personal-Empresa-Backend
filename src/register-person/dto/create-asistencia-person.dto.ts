
import { Type } from "class-transformer";
import {  IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

import { EstadoEntradasPersonal } from "src/enum/estadoEntrada";
import { Timestamp } from "typeorm";


export class CreateAsistenciaPersonDto{

    @IsNumber()
    cedula: number;

    @IsOptional()
    @IsEnum(EstadoEntradasPersonal)
    estado?: EstadoEntradasPersonal;
    

    

}