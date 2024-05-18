import { Expose, plainToInstance, Transform } from 'class-transformer';

export class SearchStudentResponse {
  @Expose()
  @Transform(({ obj }) => {
    console.log(obj);
    return obj.user.student_advance.imageUrl;
  })
  imageUrl: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.user.student_advance.fullName;
  })
  fullName: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.email;
  })
  email: string;
  static fromPlain(plain: any) {
    return plainToInstance(SearchStudentResponse, plain, {
      excludeExtraneousValues: true,
    });
  }

  static fromPlains(plains: any[]) {
    return plains.map((plain) => SearchStudentResponse.fromPlain(plain));
  }
}
