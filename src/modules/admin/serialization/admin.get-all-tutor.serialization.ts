import { Expose, plainToInstance, Transform } from 'class-transformer';

export class AdminGetAllTutorSerialization {
  @Expose()
  @Transform(({ obj }) => {
    return obj.user.id;
  })
  id: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.first_name + ' ' + obj.last_name;
  })
  fullName: string;

  @Expose()
  phone_number: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.user.auth.email;
  })
  email: string;

  @Expose()
  address: string;

  @Expose()
  city: string;

  @Expose()
  country: string;

  @Expose()
  imagePhoto: string;

  @Expose()
  @Transform(({ obj }) => {
    console.log(obj);
    return obj.user.auth.role[0].role_name;
  })
  role: string;
  @Expose()
  @Transform(({ obj }) => {
    console.log(obj);
    return obj.user.status;
  })
  status: string;
  static fromPlainArray(plain: any[]) {
    return plain.map((item) => {
      return plainToInstance(AdminGetAllTutorSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
