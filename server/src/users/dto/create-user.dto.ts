import { Role } from 'src/roles/roles.enum';

export class CreateUserDto {
  email: string;
  username?: string;
  password: string;
  role?: Role;
}
