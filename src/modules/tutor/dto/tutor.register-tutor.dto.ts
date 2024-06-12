import { DegreeType } from 'src/common/databases/datasource/entities/user-advance.entity';

export class BecomeTutorDto {
  readonly bio: string;
  readonly degree: string;
  readonly degreeType: string;
  readonly salary: number;
  readonly specialization: string;
  readonly subject: string[];
  readonly phone: string;
  readonly email: string;
  readonly endDate: number;
  readonly startDate: number;
  readonly imgUrl: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly universityName: string;
  readonly isAge18: boolean;
}
