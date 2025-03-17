import { BadGatewayException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class BoletasGuard implements CanActivate {

  constructor ( private readonly reflector : Reflector){}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    
    const boletas : string [] = this.reflector.get('boletas', context.getHandler());
    const req = context.switchToHttp().getRequest();
    const boleta : string = req.body.boleta;
    if(!boletas.includes(boleta))
    {
      throw new BadGatewayException(`la boleta ${boleta} no es valida`
      +` las boletas validas son ${boletas}`)
      
    }
    if(boletas.includes(boleta))
    {
      return  true;
    }
    
    throw new ForbiddenException(`la boleta ${boleta} no es valida`);
    
  }
}
