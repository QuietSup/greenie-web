import { Module } from '@nestjs/common';
import { DiseaseClassifierService } from './disease-classifier.service';
import { DiseaseClassifierController } from './disease-classifier.controller';

@Module({
  providers: [DiseaseClassifierService],
  exports: [DiseaseClassifierService],
  controllers: [DiseaseClassifierController],
})
export class DiseaseClassifierModule {}
