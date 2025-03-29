
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { time } from "console";
import { Boletas } from "src/enum/validatorboletas";



export class CreateAsistenciaPersonExitDto{


    @IsNumber()
    cedula: number;
  
    @IsString()
    @IsEnum(Boletas)
    boleta: Boletas;


    

}