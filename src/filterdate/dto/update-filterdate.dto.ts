import { PartialType } from '@nestjs/mapped-types';
import { CreateFilterdateDto } from './create-filterdate.dto';

export class UpdateFilterdateDto extends PartialType(CreateFilterdateDto) {}
