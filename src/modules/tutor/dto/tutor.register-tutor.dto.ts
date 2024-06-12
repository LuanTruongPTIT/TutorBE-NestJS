import { DegreeType } from 'src/common/databases/datasource/entities/user-advance.entity';

export class BecomeTutorDto {
  readonly bio: string;
  readonly degree: string;
  readonly degree_type: string;
  readonly salary: number;
  readonly specializations: string;
  readonly subject: string[];
  readonly phone: string;
  readonly email: string;
  readonly endDate: number;
  readonly startDate: number;
  readonly imgUrl: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly universityName: string;
  readonly isAge18: boolean;
}
