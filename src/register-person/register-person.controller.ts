import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { RegisterPersonService } from './register-person.service';
import { CreateRegisterPersonDto } from './dto/create-register-person.dto';
import { UpdateRegisterPersonDto } from './dto/update-register-person.dto';

import { Roles } from 'src/enum/validadorRoles';
import { AuthRoles } from 'src/auth/decorator/auth-roles.decorator';
import { RegisterPerson } from './entities/register-person.entity';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { CreateAsistenciaPersonDto } from './dto/create-asistencia-person.dto';
import { AsistenciaPersonal } from './entities/attendance.entity';
import { CreateAsistenciaPersonExitDto } from './dto/create-asistencia-personexit.dto';
import { FilterPersonDocument } from './dto/filter-documts.tdo';



@Controller('register')
@AuthRoles()
export class RegisterPersonController {
  constructor(private readonly registerPersonService: RegisterPersonService) {}

  @Post('persona')
  @AuthRoles(Roles.admin)
  create(@Body() createRegisterPersonDto: CreateRegisterPersonDto ,@GetUser() person: RegisterPerson) {
    return this.registerPersonService.create(createRegisterPersonDto);
  }

  @Post('ingreso')
  @AuthRoles(Roles.admin, Roles.user)
  Attendances( @Body() createAsistenciaPersonDto: CreateAsistenciaPersonDto , @GetUser() person : RegisterPerson) {
    return this.registerPersonService.attendances(   createAsistenciaPersonDto);
  } 
   @Post('salida')
   @AuthRoles(Roles.admin, Roles.user)
   Attendancesexit( @Body() createAsistenciaPersonExitDto: CreateAsistenciaPersonExitDto , @GetUser() person : RegisterPerson) {
     return this.registerPersonService.attendancesexit( createAsistenciaPersonExitDto);
   }

   @Get()
   @AuthRoles(Roles.admin , Roles.user)
   findAll( 
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number) {
     return this.registerPersonService.findAll( page, limit);
   }

   @Get('empleados')
    @AuthRoles(Roles.admin , Roles.user)
    empleados() {
      return this.registerPersonService.empleados();
    }

   @Delete(':asistenciaId')
   @AuthRoles(Roles.admin , Roles.user)
   async deleteAllUserAttendances(@Param('asistenciaId') asistenciaId: string) {
  return await this.registerPersonService.deleteSpecificAttendance(asistenciaId);
  }

  

}
