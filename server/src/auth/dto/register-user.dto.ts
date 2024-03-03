import { AuthBaseDto } from './auth-base.dto';

export class RegisterUserDto extends AuthBaseDto {
  adminSecret?: string;
}
