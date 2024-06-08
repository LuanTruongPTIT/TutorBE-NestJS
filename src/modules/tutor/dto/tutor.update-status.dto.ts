import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { scheduleStatus } from 'src/common/databases/datasource/entities/schedule.entity';
import { ApplicationStatus } from 'src/common/databases/datasource/entities/user-advance.entity';
export class TutorUpdateStatusDto {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
  @IsNumber()
  id: number;
}
export class CommonUpdateStatusDto {
  @IsNumber()
  id: number;
}

export class UpdateStatusScheduleDto extends CommonUpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(scheduleStatus)
  status: scheduleStatus;
}
