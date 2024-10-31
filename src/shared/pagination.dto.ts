import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  page: number = 0;

  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @Max(20)
  limit: number = 20;
}
