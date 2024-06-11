import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  @IsEmail()
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
}
