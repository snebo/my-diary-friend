import { plainToInstance } from 'class-transformer';
import {
  IsBooleanString,
  IsNumberString,
  IsString,
  validateSync,
} from 'class-validator';

class EnvVars {
  @IsString()
  DATABASE_URL!: string;

  @IsString()
  SUPABASE_URL!: string;

  @IsString()
  SUPABASE_SECRET_KEY!: string;

  @IsString()
  SUPABASE_PUBLIC_KEY!: string;

  @IsString()
  GOOGLE_API_KEY!: string;

  @IsString()
  GOOGLE_MODEL_NAME!: string;
}
export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvVars, config, {
    enableImplicitConversion: false,
  });

  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());
  return config;
}
