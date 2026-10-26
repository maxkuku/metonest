import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class NewsIdDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
