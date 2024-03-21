import { Test, TestingModule } from '@nestjs/testing';
import { SellPointService } from './sell-point.service';

describe('SellPointService', () => {
  let service: SellPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellPointService],
    }).compile();

    service = module.get<SellPointService>(SellPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
