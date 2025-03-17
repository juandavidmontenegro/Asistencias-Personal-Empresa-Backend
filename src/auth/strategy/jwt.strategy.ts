import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtpayload } from "src/interface/jwt-interface";
import { User } from "src/auth/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User) 
        private readonly userRepository : Repository<User>,
         configService : ConfigService ){
        const secretKey = configService.get('JWT_SECRET');
        if (!secretKey) {
        throw new Error('JWT_SECRET no está definido en la configuración');
}

       super({
       secretOrKey : secretKey,
       jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      
    });
    }
    async validate (payload : jwtpayload) : Promise<User>{
        const {id} = payload ;
    
        const user = await this.userRepository.findOneBy({id});
        if(!user)
          throw new UnauthorizedException('el token de usuario no es valido');
        if (!user.IsActive)
          throw new UnauthorizedException('el usuario no esta activado por favor contactese con admin');
        
        return user ;
      }
}