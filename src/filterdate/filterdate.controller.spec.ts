import { Test, TestingModule } from '@nestjs/testing';
import { FilterdateController } from './filterdate.controller';
import { FilterdateService } from './filterdate.service';

describe('FilterdateController', () => {
  let controller: FilterdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilterdateController],
      providers: [FilterdateService],
    }).compile();

    controller = module.get<FilterdateController>(FilterdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
