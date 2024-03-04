import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateDiseaseDto {
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  tfCode: number;

  @IsNotEmpty()
  speciesId: number;
}
