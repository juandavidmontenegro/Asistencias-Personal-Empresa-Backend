import { PartialType } from '@nestjs/mapped-types';
import { CreateFileloadDto } from './create-fileload.dto';

export class UpdateFileloadDto extends PartialType(CreateFileloadDto) {}
