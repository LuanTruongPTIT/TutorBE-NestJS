import { Expose, plainToInstance, Transform } from 'class-transformer';

export class TutorGetAllStudentsOfTutorSerialization {
  @Expose()
  id: number;
  @Expose()
  @Transform(({ obj }) => {
    return obj.email;
  })
  email: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.fullName;
  })
  fullName: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.address;
  })
  address: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.phoneNumber;
  })
  phone: string;
  @Expose()
  @Transform(({ obj }) => {
    const str = obj.gender;

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  })
  gender: string;
  @Expose()
  @Transform(({ obj }) => {
    const str = obj.level;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  })
  level: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.school;
  })
  school: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.dateOfBirth;
  })
  dateOfBirth: string;
  @Expose()
  @Transform(({ obj }) => {
    const str = obj.status;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  })
  status: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.imageUrl;
  })
  imageUrl: string;
  @Expose()
  @Transform(({ obj }) => {
    return obj.country;
  })
  country: string;
  static fromPlain(plain: any[]) {
    return plain.map((item, index) => {
      item['id'] = index + 1;
      return plainToInstance(TutorGetAllStudentsOfTutorSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
