import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CourseCreateDto {
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  title: string;
}
export class ChapterCreateDto extends CourseCreateDto {}
