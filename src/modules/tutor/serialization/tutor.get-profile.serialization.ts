import { Expose, plainToInstance, Transform, Type } from 'class-transformer';

export class ActivityGetProfileSerialization {
  @Expose()
  organization_name: string;
  @Expose()
  achivements: string;
  @Expose()
  start_year: string;
  @Expose()
  imageOrganization: string;
  @Expose()
  link_credential: string;
  @Expose()
  end_year: string;
}
export class TutorGetProfileSerialization {
  @Expose()
  imagePhoto: string;

  @Expose()
  @Transform(({ obj }) => {
    console.log('value', obj);
    return obj?.last_name + ' ' + obj?.first_name;
  })
  fullName: string;

  @Expose()
  email: string;

  @Expose()
  address: string;

  @Expose()
  phone_number: string;
  @Expose()
  bio: string;

  @Expose()
  @Type(() => ActivityGetProfileSerialization)
  activities: ActivityGetProfileSerialization[];

  static async fromPlain(plain: any) {
    return plainToInstance(TutorGetProfileSerialization, plain, {
      excludeExtraneousValues: true,
    });
  }
}
