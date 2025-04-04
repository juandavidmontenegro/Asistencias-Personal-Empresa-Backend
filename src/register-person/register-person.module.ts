import { Module } from '@nestjs/common';
import { RegisterPersonService } from './register-person.service';
import { RegisterPersonController } from './register-person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterPerson } from './entities/register-person.entity';
import { AsistenciaPersonal } from './entities/attendance.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { AsistenciaPersonalExit } from './entities/attendance-exit.entity';
import {  ObservacionValidator } from './boleta.service';

@Module({
  imports: [ AuthModule,  
    TypeOrmModule.forFeature([RegisterPerson, AsistenciaPersonal , AsistenciaPersonalExit]) , PassportModule
],
  controllers: [RegisterPersonController],
  providers: [RegisterPersonService , ObservacionValidator ],
  exports: [RegisterPersonService, ObservacionValidator ]
})
export class RegisterPersonModule {}
