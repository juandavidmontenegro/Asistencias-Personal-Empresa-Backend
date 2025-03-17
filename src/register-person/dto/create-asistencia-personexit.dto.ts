
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { time } from "console";
import { Boletas } from "src/enum/validatorboletas";



export class CreateAsistenciaPersonExitDto{


    @IsNumber()
    cedula: number;
   // @Transform(({ value}) => value.trim())// valida los espacios en blanco
   // @IsNotEmpty()
   // @IsDateString()  // Valida que el valor sea una cadena de fecha válida en formato ISO 8601
   // @Type(() => Date)  // Convierte la cadena ISO a una instancia de Date
    //fecha: Date;
   // @Transform(({ value}) => value.trim())// valida los espacios en blanco
   // @IsNotEmpty()
   // @IsDateString()  // Valida que el valor sea una cadena de fecha válida en formato ISO 8601
   // @Type(() => time)  // Convierte la cadena ISO a una instancia de Date
   // hora: Date;

    //@Transform(({ value}) => value.trim())// valida los espacios en blanco
    //@IsOptional()
    @IsString()
    @IsEnum(Boletas)
    boleta: Boletas;


    

}