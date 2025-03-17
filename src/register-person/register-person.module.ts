import { Module } from '@nestjs/common';
import { RegisterPersonService } from './register-person.service';
import { RegisterPersonController } from './register-person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterPerson } from './entities/register-person.entity';
import { AsistenciaPersonal } from './entities/attendance.entity';
import { PassportModule } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { AsistenciaPersonalExit } from './entities/attendance-exit.entity';

@Module({
  imports: [ AuthModule,  TypeOrmModule.forFeature([RegisterPerson, AsistenciaPersonal , AsistenciaPersonalExit]) , PassportModule],
  controllers: [RegisterPersonController],
  providers: [RegisterPersonService ],
  exports: [RegisterPersonService ]
})
export class RegisterPersonModule {}
