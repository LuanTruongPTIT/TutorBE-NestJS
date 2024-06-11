import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Level } from 'src/common/databases/datasource/entities/student-advance.entity';

export class AdminCreateStudentDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  parent_name: string;

  @IsNotEmpty()
  @IsString()
  date_of_birth: Date;

  @IsNotEmpty()
  @IsString()
  name_school: string;
  @IsNotEmpty()
  @IsString()
  urls: string;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;
}
