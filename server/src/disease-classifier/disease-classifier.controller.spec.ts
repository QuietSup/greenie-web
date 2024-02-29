import { Test, TestingModule } from '@nestjs/testing';
import { DiseaseClassifierController } from './disease-classifier.controller';

describe('DiseaseClassifierController', () => {
  let controller: DiseaseClassifierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiseaseClassifierController],
    }).compile();

    controller = module.get<DiseaseClassifierController>(
      DiseaseClassifierController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
