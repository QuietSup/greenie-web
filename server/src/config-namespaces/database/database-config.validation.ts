import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

class DatabaseEnv {
  @IsString()
  DATABASE_DATABASE: string;

  @IsString()
  DATABASE_HOST: string;

  @Min(0)
  @Max(65535)
  @IsNumber()
  DATABASE_PORT: number;

  @MinLength(4)
  DATABASE_USERNAME: string;

  @MinLength(4)
  DATABASE_PASSWORD: string;
}

export const validateDatabaseEnv = function validate(
  config: Record<string, unknown>,
) {
  const validatedConfig = plainToClass(DatabaseEnv, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });

  if (errors.length > 0) {
    errors.forEach((err) => {
      Logger.error(err.toString());
    });
    throw new Error();
  }
  return validatedConfig;
};
