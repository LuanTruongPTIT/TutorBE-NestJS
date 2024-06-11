import { Expose, plainToInstance, Transform } from 'class-transformer';

export class AdminGetAllStudentSerialization {
  // @Expose()
  // @Transform(({ obj }) => {
  //   return obj.user.id;
  // })
  // id: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.firstName + ' ' + obj.lastName;
  })
  fullName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.email;
  })
  email: string;

  @Expose()
  imageUrl: string;
  @Expose()
  school: string;
  // @Expose()
  // @Transform(({ obj }) => {
  //   console.log(obj);
  //   return obj.role_name;
  // })
  // role: string;

  @Expose()
  @Transform(({ obj }) => {
    const data = obj.status;
    return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  })
  status: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.parent_name;
  })
  parent_name: string;

  @Expose()
  @Transform(({ obj }) => {
    const data = obj.level;
    return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  })
  level: string;

  @Transform(({ obj }) => {
    const date = new Date(obj.createdAt);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  })
  @Expose()
  join: Date;
  @Expose()
  @Transform(({ obj }) => {
    console.log(obj);
    const data = obj.gender;
    return data && data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
  })
  gender: string;
  static fromPlainArray(plain: any[]) {
    return plain.map((item) => {
      return plainToInstance(AdminGetAllStudentSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
