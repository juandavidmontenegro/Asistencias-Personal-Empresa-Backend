import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilterdateService } from './filterdate.service';
import { CreateFilterdateDto } from './dto/create-filterdate.dto';
import { UpdateFilterdateDto } from './dto/update-filterdate.dto';

@Controller('filterdate')
export class FilterdateController {
  constructor(private readonly filterdateService: FilterdateService) {}

  @Post()
  create(@Body() createFilterdateDto: CreateFilterdateDto) {
    return this.filterdateService.create(createFilterdateDto);
  }

  @Get()
  findAll() {
    return this.filterdateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filterdateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilterdateDto: UpdateFilterdateDto) {
    return this.filterdateService.update(+id, updateFilterdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filterdateService.remove(+id);
  }
}
