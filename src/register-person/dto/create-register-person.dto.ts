import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRegisterPersonDto {

    
    @IsString()
    @IsNotEmpty()
    cedula: string;

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
