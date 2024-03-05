import { IsNumber, MinLength, ValidateIf } from 'class-validator';

export class UpdateDiseaseDto {
  @ValidateIf((obj, value) => value != null)
  @MinLength(1)
  name?: string;

  @ValidateIf((obj, value) => value != null)
  @IsNumber()
  tfCode?: number;

  @ValidateIf((obj, value) => value != null)
  @IsNumber()
  speciesId?: number;
}
