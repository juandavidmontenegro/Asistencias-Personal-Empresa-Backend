import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateAuthLoginDto } from './dto/create-auth-login';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  login(@Body() createAuthLoginDto: CreateAuthLoginDto) {
    return this.authService.login(createAuthLoginDto);
  }
  // obtener el usuario desde el token solo token
  @Get('check-status')
  @UseGuards(AuthGuard('jwt'))
  checkAuthStatus(@GetUser() user : User){
    return this.authService.checkAuthStatus(user);
  }
  
}
