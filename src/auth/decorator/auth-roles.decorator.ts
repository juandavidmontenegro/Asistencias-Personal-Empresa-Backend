import { applyDecorators, UseGuards } from "@nestjs/common";
import { Rolprotect } from "./rolprotect.decorator";
import { Roles } from "src/enum/validadorRoles";
import { AuthGuard } from "@nestjs/passport";
import { UserRolesGuard } from "../guard/user-roles.guard";

export function AuthRoles (...roles: Roles[]){
    return applyDecorators(
        Rolprotect(...roles),
        UseGuards(AuthGuard(),UserRolesGuard)
   
    )
}