import { registerAs } from '@nestjs/config';
import { IsNumber, Max, Min } from 'class-validator';

export const authConfig = registerAs('auth', () => ({
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpires: process.env.JWT_ACCESS_EXPIRES,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES,
  mainAdminSecret: process.env.MAIN_ADMIN_SECRET,
}));
