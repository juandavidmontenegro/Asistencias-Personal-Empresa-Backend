
import { Transform, Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { time } from "console";
import { Boletas } from "src/enum/validatorboletas";
import { RequireFechaBoleta } from "../decorator/validar-boleta-citamedica.decorator";



export class CreateAsistenciaPersonExitDto{


    @IsString()
    @IsNotEmpty()
    cedula: string;
  
    @IsString()
    @IsEnum(Boletas)
    boleta: Boletas;

    @IsOptional()
    @IsDate()
    @Type(() => Date)  // Esto transformará automáticamente el string a Date
    @Transform(({ value }) => value ? new Date(value) : null)
    @RequireFechaBoleta()
    fechaboleta?: Date;

    

}