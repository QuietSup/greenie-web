import { registerAs } from '@nestjs/config';
import { IsNumber, Max, Min } from 'class-validator';

export const databaseConfig = registerAs('database', () => ({
  database: process.env.DATABASE_DATABASE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}));
