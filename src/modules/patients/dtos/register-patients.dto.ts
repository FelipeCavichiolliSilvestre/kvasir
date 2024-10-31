import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
} from 'class-validator';

export class RegisterPatientsDto {
  @Type(() => String)
  @IsString()
  @Length(4, 255)
  name: string;

  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  weightInKg: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(300)
  heightInCm: number;
}
