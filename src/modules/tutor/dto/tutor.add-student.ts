import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class DateDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  })
  from: Date;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  })
  to: Date;
}
export class AddStudentDto {
  @IsNotEmpty()
  @IsString()
  course_name: string;

  @Type(() => DateDto)
  date: DateDto;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  isSelect: boolean;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  class_name: string;
}
