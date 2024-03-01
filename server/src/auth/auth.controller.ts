import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { JwtAccessAuthGuard } from './guards/jwt-access.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get('test')
  async test(@Request() req: any) {
    return req.user;
  }
}
