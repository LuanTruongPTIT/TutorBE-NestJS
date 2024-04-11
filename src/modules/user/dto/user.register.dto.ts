import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Type(() => String)
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  @Type(() => String)
  password: string;

  @IsNotEmpty()
  @MaxLength(50)
  @Type(() => String)
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  name: string;
}
