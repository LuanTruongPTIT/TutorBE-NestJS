import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TutorMarkPresentDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  day: string;

  @IsNotEmpty()
  @IsBoolean()
  present: boolean;

  @IsNotEmpty()
  @IsNumber()
  room_id: number;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;
}
