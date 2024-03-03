import { Role } from 'src/auth/modules/roles/roles.enum';

export class CreateUserDto {
  email: string;
  username?: string;
  password: string;
  role?: Role;
}
