import { Expose, Transform, plainToInstance } from 'class-transformer';
import { ReigsterTutorEntity } from 'src/common/databases/datasource/entities/user-advance.entity';

export class TutorApplicationSerialization {
  @Expose()
  id: number;

  @Transform(({ obj }) => `${obj.user.firstName} ${obj.user.lastName}`)
  @Expose()
  name: string;

  // @Transform(({ obj }) => {
  //   console.log(obj);
  //   return obj.index ? obj.index + 1 : 1;
  // })
  @Expose()
  index: number;
  @Expose()
  position = 'Application for tutor';

  @Transform(({ obj }) => obj.image[0]?.image_url)
  @Expose()
  logo: string;

  @Expose()
  status: string;

  @Transform(({ value }) =>
    new Date(value).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  )
  @Expose()
  createdAt: string;

  @Transform(({ obj }) => {
    return new Date(obj.updatedAt).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  })
  @Expose()
  in_stage: string;

  static fromPlain(plain: ReigsterTutorEntity[]) {
    return plain.map((item, index) => {
      item.position = 'Application for tutor';
      item['index'] = index + 1;
      return plainToInstance(TutorApplicationSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }

  static fromPlainDetail(plain: ReigsterTutorEntity) {
    return plainToInstance(TutorApplicationSerialization, plain, {
      excludeExtraneousValues: true,
    });
  }
}
export class TutorApplicationInterview {
  @Expose()
  id: number;

  @Transform(({ obj }) => `${obj.user.firstName} ${obj.user.lastName}`)
  @Expose()
  name: string;

  @Expose()
  index: number;
  @Expose()
  position = 'tutor';

  @Transform(({ obj }) => obj.image[0]?.image_url)
  @Expose()
  logo: string;

  @Expose()
  status: string;

  @Transform(({ obj }) => {
    return new Date(obj.updatedAt).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  })
  @Expose()
  in_stage: string;
  @Expose()
  createdAt: string;

  static fromPlain(plain: ReigsterTutorEntity[]) {
    return plain.map((item, index) => {
      item.position = 'tutor';
      item['index'] = index + 1;
      return plainToInstance(TutorApplicationInterview, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
