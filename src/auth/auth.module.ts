import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { User } from './entities/user.entity';




@Module({
  imports:[ 
    TypeOrmModule.forFeature([User]),
    TypeOrmModule,
    ConfigModule,
    PassportModule.register({
      defaultStrategy : 'jwt'
    }),
   // tenemos que pasarle toda la configuracion que estamos instalando en el modulo para el jwt
   // CREAMOS UN  MODULO ASINCRONO PARA PODER TERNER NUESTRAS SECRET
     JwtModule.registerAsync({
       imports:[ ConfigModule ],
       inject:[ConfigService],
       useFactory : ( configService :  ConfigService) => {
       // console.log(' llave secreta :', configService.get('JWT_SECRET'))
         return{
                  secret :configService.get('JWT_SECRET'),
                  signOptions :
                    {
                    expiresIn :  configService.get('JWT_EXPIRES_IN')
                    }
         }
       }
     }),
  ],
// importamos el modulo que queremos renderizar en este caso los usuarios
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy  ],
  exports : [ JwtModule , PassportModule, TypeOrmModule, JwtStrategy  ]
})
export class AuthModule {}
