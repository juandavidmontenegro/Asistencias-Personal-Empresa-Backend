import { IsDateString, IsNotEmpty } from "class-validator";

export class LoadFileDto {
    
      @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
      @IsDateString({}, { message: 'Formato de fecha inválido' })
      fechaInicio: string;
      @IsNotEmpty({ message: 'La fecha final es requerida' })
      @IsDateString({}, { message: 'Formato de fecha inválido' })
      fechaFin: string;

}