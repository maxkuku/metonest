import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class NewsCreateDto {
  id: number | string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateIf((o) => o.author)
  @IsString()
  author: string;

  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @ValidateIf((o) => o.cover)
  @IsString()
  cover: string;

  @IsOptional()
  createdAt: Date | string;
}
