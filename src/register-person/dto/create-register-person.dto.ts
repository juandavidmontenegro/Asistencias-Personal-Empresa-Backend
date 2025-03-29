import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateRegisterPersonDto {

    
    @IsNumber()
    cedula: number;

    @IsString()
    nombrecompleto: string;

    @IsString()
    empresa: string;

    @IsString()
    cargo: string;
    
    @IsString()
    jefeInmediato: string;
    
    @IsEmail()
    correo: string;

}
