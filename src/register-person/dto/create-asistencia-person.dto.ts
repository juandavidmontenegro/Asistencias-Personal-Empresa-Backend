import {   IsEnum, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { EstadoEntradasPersonal } from "src/enum/estadoEntrada";
import { RequireObservacionIfBoleta } from "../decorator/validar-boleta-entrada.decorator";


export class CreateAsistenciaPersonDto{

    @IsNumber()
    cedula: number;

    @IsOptional()
    @IsEnum(EstadoEntradasPersonal)
    estado?: EstadoEntradasPersonal;
    
    @IsOptional()
    @IsString()
    @RequireObservacionIfBoleta() // Usar un validador personalizado
    observacion?: string;
    

}