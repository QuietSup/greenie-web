import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosisDto } from './create-diagnosis.dto';
import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class UpdateDiagnosisDto {
  @IsNumber()
  diseaseId?: number;
}
