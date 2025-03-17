import { Injectable } from '@nestjs/common';
import { CreateFilterdateDto } from './dto/create-filterdate.dto';
import { UpdateFilterdateDto } from './dto/update-filterdate.dto';

@Injectable()
export class FilterdateService {
  create(createFilterdateDto: CreateFilterdateDto) {
    return 'This action adds a new filterdate';
  }

  findAll() {
    return `This action returns all filterdate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filterdate`;
  }

  update(id: number, updateFilterdateDto: UpdateFilterdateDto) {
    return `This action updates a #${id} filterdate`;
  }

  remove(id: number) {
    return `This action removes a #${id} filterdate`;
  }
}
