import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TutorAttendanceStudentDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  room: number;
}
