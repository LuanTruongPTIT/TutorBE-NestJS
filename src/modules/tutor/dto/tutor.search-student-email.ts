import { IsEmail, IsNotEmpty } from 'class-validator';

export class SearchStudentEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
