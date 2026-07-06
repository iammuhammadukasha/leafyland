import { plainToInstance } from 'class-transformer';
import {
  IsBooleanString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPort,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsIn(['development', 'production', 'test'])
  NODE_ENV!: string;

  @IsPort()
  PORT!: string;

  @IsString()
  @IsNotEmpty()
  API_PREFIX!: string;

  @IsString()
  @IsNotEmpty()
  APP_VERSION!: string;

  @IsOptional()
  @IsString()
  DATABASE_URL?: string;

  @IsOptional()
  @IsString()
  DATABASE_HOST?: string;

  @IsOptional()
  @IsPort()
  DATABASE_PORT?: string;

  @IsOptional()
  @IsString()
  DATABASE_USER?: string;

  @IsOptional()
  @IsString()
  DATABASE_PASSWORD?: string;

  @IsOptional()
  @IsString()
  DATABASE_NAME?: string;

  @IsOptional()
  @IsBooleanString()
  DATABASE_SSL?: string;

  @IsOptional()
  @IsBooleanString()
  DATABASE_REQUIRED?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const withDefaults = {
    NODE_ENV: 'development',
    PORT: '4000',
    API_PREFIX: 'api',
    APP_VERSION: '0.1.0',
    ...config,
  };

  const validated = plainToInstance(EnvironmentVariables, withDefaults, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validated;
}
