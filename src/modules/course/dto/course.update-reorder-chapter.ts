import { IsNotEmpty, IsNumber } from 'class-validator';

export class CourseUpdateReorderChapterDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  position: number;
}
