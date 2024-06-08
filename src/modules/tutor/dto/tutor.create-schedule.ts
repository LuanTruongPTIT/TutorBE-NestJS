import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsOptional()
  @Type(() => Number)
  chapter: number;

  @IsOptional()
  @Type(() => Number)
  course: number;

  @IsNotEmpty()
  date_schedule: string;

  @IsOptional()
  @Type(() => String)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  room: number;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  topic: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  duration_time: string;
}
