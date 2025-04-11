import {   IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { EstadoEntradasPersonal } from "src/enum/estadoEntrada";
import { RequireObservacionIfBoleta } from "../decorator/validar-boleta-entrada.decorator";


export class CreateAsistenciaPersonDto{

    @IsString()
    @IsNotEmpty()
    cedula: string;

    @IsOptional()
    @IsEnum(EstadoEntradasPersonal)
    estado?: EstadoEntradasPersonal;
    
    @IsOptional()
    @IsString()
    @RequireObservacionIfBoleta() // Usar un validador personalizado
    observacion?: string;
    

}