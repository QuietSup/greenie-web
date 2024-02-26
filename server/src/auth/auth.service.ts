import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      return password == user.password ? user : null;
    }

    return null;
  }

  login() {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.findOneByEmail(registerUserDto.email);
    if (user) throw new ConflictException('user already exists');

    const newUser = await this.usersService.create(registerUserDto);
    if (!newUser) throw new BadRequestException('something went wrong');

    return newUser;
  }
}
