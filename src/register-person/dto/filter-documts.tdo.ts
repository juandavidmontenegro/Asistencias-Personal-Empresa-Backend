import {  IsNumber } from "class-validator";

export class FilterPersonDocument{

    @IsNumber()
    cedula : number

}