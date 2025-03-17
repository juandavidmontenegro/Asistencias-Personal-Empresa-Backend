import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisterPersonDto } from './create-register-person.dto';

export class UpdateRegisterPersonDto extends PartialType(CreateRegisterPersonDto) {}
