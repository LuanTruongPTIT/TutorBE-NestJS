import {
  IsString,
  MinLength,
  IsEmail,
  IsOptional,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from 'src/common/databases/datasource/entities/user.entity';

export class TutorCreateSutdentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long.' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long.' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Country must be at least 2 characters long.' })
  country: string;

  @IsNotEmpty()
  @IsString()
  // @MinLength(30)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Start date should be in the format YYYY-MM-DD',
  })
  admission: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, {
    message: 'Phone number must be at least 10 characters long.',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  school: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Start date should be in the format YYYY-MM-DD',
  })
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  parent_name?: string;

  @IsOptional()
  @IsString()
  parent_phone?: string;

  @IsOptional()
  @IsEmail()
  parent_email?: string;

  @IsOptional()
  @IsString()
  parent_address?: string;

  @IsOptional()
  @IsString()
  parent_country?: string;
}
