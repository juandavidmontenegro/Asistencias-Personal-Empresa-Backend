import { Roles } from "src/enum/validadorRoles";

export interface jwtpayload {
   
    
    id : string,
    email : string,
    role : string
}