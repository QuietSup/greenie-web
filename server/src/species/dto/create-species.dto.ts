import { IsNotEmpty } from 'class-validator';

export class CreateSpeciesDto {
  @IsNotEmpty()
  name: string;
}
