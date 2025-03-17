import { BadGatewayException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { META_ROLES } from '../decorator/rolprotect.decorator';


@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor (private readonly reflector : Reflector){}
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {

    const validatorRoles: string [] = this.reflector.get(META_ROLES, context.getHandler())
    if(!validatorRoles) return true;
    if(validatorRoles.length === 0 ) return true;
   const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if(!user)
      throw new BadGatewayException('usuario no encontrado');
    if(validatorRoles.includes(user.role))
      
      { 
      return true;

      }
  // }
   throw new  ForbiddenException(`user ${user.nombre} no es : [${validatorRoles}]`)
  }

}
