import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {  TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { RegisterPersonModule } from './register-person/register-person.module';
import { FileloadModule } from './fileload/fileload.module';
import { FilterdateModule } from './filterdate/filterdate.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        //url: configService.get('DATABASE_URL'),
        host: configService.get('POSTGRES_HOST'),
        port: +configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule, RegisterPersonModule, FileloadModule, FilterdateModule,
  ],
  controllers: [AppController],
  providers: [AppService , AuthService , ],
  exports : [AuthModule  ]
  
})
export class AppModule{ }
