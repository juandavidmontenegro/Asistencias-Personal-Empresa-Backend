import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { FileloadService } from './fileload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/filefilter.helper';

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
