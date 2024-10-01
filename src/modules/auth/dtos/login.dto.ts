import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginDto {
  @Type(() => String)
  @IsString()
  username: string;

  @Type(() => String)
  @IsString()
  password: string;
}
