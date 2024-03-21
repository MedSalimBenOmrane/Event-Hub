import { Test, TestingModule } from '@nestjs/testing';
import { SellPointController } from './sell-point.controller';
import { SellPointService } from './sell-point.service';

describe('SellPointController', () => {
  let controller: SellPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellPointController],
      providers: [SellPointService],
    }).compile();

    controller = module.get<SellPointController>(SellPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
