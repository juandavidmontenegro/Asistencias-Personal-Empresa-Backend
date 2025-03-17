import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Roles } from "src/enum/validadorRoles";

export class CreateAuthDto {
    @Transform(({ value}) => value.trim())// valida los espacios en blanco
    @IsString()
    nombre: string ;
    @Transform(({ value}) => value.trim())// valida los espacios en blanco
    @IsString()
    apellido: string ;
    
    @IsEmail()
    email: string ;

   
    @Transform(({ value}) => value.trim())// valida los espacios en blanco
    @IsString()
    @MinLength(6)
    password: string ;

    @IsOptional()
    @IsEnum(Roles)
    role?: Roles;

    // @Transform(({ value}) => value.trim())// valida los espacios en blanco
    // @IsString()
    // RefreshToken: string;


}
