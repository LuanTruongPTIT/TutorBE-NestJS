import { Expose, Transform, plainToInstance } from 'class-transformer';

export class TutorGetAllScheduleSerialization {
  @Expose()
  id: number;
  @Expose()
  topic: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.Class.name;
  })
  room: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.Class.course.title;
  })
  course: string;

  @Expose()
  date: string;

  @Expose()
  formal: string;

  @Expose()
  status: string;

  static async fromPlainArray(plain: any[]) {
    return plain.map((item) => {
      return plainToInstance(TutorGetAllScheduleSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
