import { Expose, plainToInstance, Transform } from 'class-transformer';

export class AdminGetAllUserSerialization {
  @Expose()
  id: string;
  @Expose()
  fullName: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.auth.email;
  })
  email: string;
  @Expose()
  status: string;

  @Expose()
  @Transform(({ obj }) => {
    console.log(obj.auth.role[0]);
    return obj.auth.role[0].role_name;
  })
  role: string;
  @Expose()
  @Transform(({ obj }) => {
    return new Date(obj.createdAt).toLocaleDateString();
  })
  createdAt: Date;

  static fromPlainArray(plain: any[]) {
    return plain.map((item) => {
      return plainToInstance(AdminGetAllUserSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
