import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateFileloadDto {

    @IsString()

    modelo: string;
    
    @IsString()

    serie: string;
    
    @IsString()
    marca: string;
    
    @IsDateString()
    fechaEntrada: Date;




}
