import { Expose, plainToInstance, Transform } from 'class-transformer';
import { ReigsterTutorEntity } from 'src/common/databases/datasource/entities/user-advance.entity';

export class TutorGetApplicationDetailSerialization {
  @Expose()
  readonly id: number;

  @Transform(({ obj }) => `${obj.user.firstName} ${obj.user.lastName}`)
  @Expose()
  readonly name: string;

  @Expose()
  readonly college: string;

  @Expose()
  readonly degree: string;

  @Expose()
  readonly degree_type: string;

  @Expose()
  readonly bio: string;

  @Expose()
  readonly salary: number;

  @Transform(({ obj }) => {
    return obj.subject.map((item) => item.name);
  })
  @Expose()
  readonly subject: string[];

  @Expose()
  readonly start_date_study_year: number;

  @Expose()
  readonly end_date_study_year: number;

  static fromPlain(plain: ReigsterTutorEntity) {
    return plainToInstance(TutorGetApplicationDetailSerialization, plain, {
      excludeExtraneousValues: true,
    });
  }
}
