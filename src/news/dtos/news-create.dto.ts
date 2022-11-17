import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

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

  @IsNumber()
  authorId: number;

  @IsNumber()
  categoryId: number;

  @ValidateIf((o) => o.cover)
  @IsString()
  cover: string;

  @IsString()
  createdAt: Date | string;
}
