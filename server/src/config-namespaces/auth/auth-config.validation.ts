import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Matches, MinLength, validateSync } from 'class-validator';

class AuthEnv {
  @MinLength(8)
  JWT_ACCESS_SECRET: string;

  @Matches(
    /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i,
  )
  JWT_ACCESS_EXPIRES: string;

  @MinLength(8)
  JWT_REFRESH_SECRET: string;

  @Matches(
    /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i,
  )
  JWT_REFRESH_EXPIRES: string;

  @MinLength(8)
  MAIN_ADMIN_SECRET: string;
}

export const validateDatabaseEnv = function validate(
  config: Record<string, unknown>,
) {
  const validatedConfig = plainToClass(AuthEnv, config, {
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
