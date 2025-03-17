import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateAuthLoginDto } from './dto/create-auth-login';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtpayload } from 'src/interface/jwt-interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {

constructor(@InjectRepository(User) private readonly userRepository : Repository<User>, 
   private readonly jwtService : JwtService , configService : ConfigService){}


// crear usuario desde el servicio de usuarios
  async create(createAuthDto: CreateAuthDto) {        
    try {
      const { password , ...userdata} = createAuthDto
      const user = this.userRepository.create({
        ...userdata, password : bcrypt.hashSync(password, 10)
      }) 
      await this.userRepository.save(user)
        const {password:_, id:__, ...rest} = user
      return {
        message : 'Usuario creado correctamente',
        user : {
         ...rest,
         token : this.jwtToken({id : user.id , email: user.email}) // generamos el token
        }
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // cuando se logea el usuario 
  async login(createAuthLoginDto: CreateAuthLoginDto) {
    try {
      const {email, password} = createAuthLoginDto
      const user = await this.userRepository.findOneBy({email}) // buscamos si el usuario existe
      if(!user) 
        {throw new UnauthorizedException(`el usuario no existe con este email : ${email}`)}
      
      // si no existe el usuario
      if(!bcrypt.compareSync(password, user.password))
         {throw new UnauthorizedException(`contraseña incorrecta`)} // si la contraseña es incorrecta
      const {password:_, id:__, ...rest} = user
      return {
        message : 'Usuario logeado correctamente',
        user : {
          ...rest,
            token : this.jwtToken({id : user.id , email: user.email}) // generamos el token
        }
      }
      
    } catch (error) {
      throw new BadRequestException(error.message);
      
    }
  }
  private jwtToken( payload : jwtpayload){

    const token = this.jwtService.sign(payload);
    return token;
  }
   
  // obenemos toda la infromacion copn el solo token 
  async checkAuthStatus(user : User){
    const {password:_, id:__, created_at, ...rest} = user
    return {
      user : {
        ...rest,
      token : this.jwtToken({id : user.id, email: user.email}) // generamos el token

      }
      
    }
  }
  


}
