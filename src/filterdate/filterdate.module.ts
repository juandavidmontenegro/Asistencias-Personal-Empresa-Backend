import { Module } from '@nestjs/common';
import { FilterdateService } from './filterdate.service';
import { FilterdateController } from './filterdate.controller';

@Module({
  controllers: [FilterdateController],
  providers: [FilterdateService],
})
export class FilterdateModule {}
