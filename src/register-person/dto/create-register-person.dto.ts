import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateRegisterPersonDto {

    
    @IsString()
    cedula: String;

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
