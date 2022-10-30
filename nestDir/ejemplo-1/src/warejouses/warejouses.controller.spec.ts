import { Test, TestingModule } from '@nestjs/testing';
import { WarejousesController } from './warejouses.controller';

describe('WarejousesController', () => {
  let controller: WarejousesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarejousesController],
    }).compile();

    controller = module.get<WarejousesController>(WarejousesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
