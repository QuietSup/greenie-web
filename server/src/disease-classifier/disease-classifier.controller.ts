import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DiseaseClassifierService } from './disease-classifier.service';

@Controller('classify')
export class DiseaseClassifierController {
  constructor(
    private readonly diseaseClassifierService: DiseaseClassifierService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const predict = await this.diseaseClassifierService.predict(file.buffer);
    console.log(predict);
    return predict;
  }
}
