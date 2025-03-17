import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

// este es para que el usuario se logee y pueda escribir las credenciales de usuario
export class CreateAuthLoginDto{
    @IsEmail()
    @IsString()
    email: string;

    @Transform(({ value}) => value.trim())// valida los espacios en blanco
    @IsString()
    @MinLength(6)
    password: string;
   
    
    
}