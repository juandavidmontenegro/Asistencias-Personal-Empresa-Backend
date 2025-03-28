import { Module } from '@nestjs/common';
import { FileloadService } from './fileload.service';
import { FileloadController } from './fileload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fileload } from './entities/fileload.entity';
import { MulterModule } from '@nestjs/platform-express';
import { RegisterPersonModule } from 'src/register-person/register-person.module';
import { RegisterPersonService } from 'src/register-person/register-person.service';


@Module({
imports: [ 
  TypeOrmModule.forFeature([Fileload]),
  MulterModule.register({
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB
    }
  })
],
  controllers: [FileloadController],
  providers: [FileloadService],
})
export class FileloadModule {}
