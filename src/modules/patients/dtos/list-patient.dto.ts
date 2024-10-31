import { Type } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';
import { PaginationDto } from '../../../shared';

export class ListPatientsDto extends PaginationDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  @Length(0, 255)
  search?: string;
}
