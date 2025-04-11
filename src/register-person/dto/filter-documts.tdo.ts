import {  IsNumber, IsString } from "class-validator";

export class FilterPersonDocument{

    @IsString()
    cedula : string;

}