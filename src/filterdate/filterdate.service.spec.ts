import { Test, TestingModule } from '@nestjs/testing';
import { FilterdateService } from './filterdate.service';

describe('FilterdateService', () => {
  let service: FilterdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterdateService],
    }).compile();

    service = module.get<FilterdateService>(FilterdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
