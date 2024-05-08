import { IsEnum, IsNumber } from 'class-validator';
import { ApplicationStatus } from 'src/common/databases/datasource/entities/user-advance.entity';
export class TutorUpdateStatusDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
  @IsNumber()
  id: number;
}
