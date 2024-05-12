import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CourseUpdateCourseDto {
  @IsOptional()
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  title: string;

  @IsOptional()
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @Type(() => String)
  description: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  image: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  price: number;
}
