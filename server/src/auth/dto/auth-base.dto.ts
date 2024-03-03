import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

/**
 * Class with authorization fields and rules.
 *
 * Created to not repeat these rules in every authorization dto
 */
export class AuthBaseDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(4)
  @MaxLength(33)
  password: string;
}
