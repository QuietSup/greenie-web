import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { authConfig } from 'src/config-namespaces/auth/auth.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  login(user: any) {
    const payload = { email: user.email, userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.authConf.jwtAccessSecret,
        expiresIn: this.authConf.jwtAccessExpires,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.authConf.jwtRefreshSecret,
        expiresIn: this.authConf.jwtRefreshExpires,
      }),
    };
  }

  refreshToken(user: any) {
    const payload = { email: user.email, userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: 'ToBeChanged',
        expiresIn: '6h',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: 'ToBeChanged',
        expiresIn: '1d',
      }),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.findOneByEmail(registerUserDto.email);
    if (user) throw new ConflictException('user already exists');

    const newUser = await this.usersService.create(registerUserDto);
    if (!newUser) throw new BadRequestException('something went wrong');

    return newUser;
  }
}
