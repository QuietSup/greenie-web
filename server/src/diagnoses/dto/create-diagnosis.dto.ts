import { IsNotEmpty } from 'class-validator';

export class CreateDiagnosisDto {
  @IsNotEmpty()
  diseaseId: number;
}
