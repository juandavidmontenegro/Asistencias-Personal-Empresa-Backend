import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileloadService } from './fileload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/filefilter.helper';

import { AuthRoles } from 'src/auth/decorator/auth-roles.decorator';
import { Roles } from 'src/enum/validadorRoles';

@Controller('documents')
export class FileloadController {
  constructor(private readonly fileloadService: FileloadService) {}

  @Post('files')
 // @AuthRoles(Roles.admin , Roles.user)
  @UseInterceptors(FileInterceptor('file', { fileFilter : fileFilter ,  }))
  filesave(@UploadedFile() file: Express.Multer.File,)
  {
    return this.fileloadService.registerfile(file )
  }
}
