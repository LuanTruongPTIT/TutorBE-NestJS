import { Expose, plainToInstance, Transform, Type } from 'class-transformer';

export class ChapterSerialization {
  @Expose()
  @Type(() => String)
  id: string;
  @Expose()
  title: string;
  @Expose()
  position: number;
}
export class GetCourseUserResponseSerialization {
  @Expose()
  title: string;
  @Expose()
  @Transform(({ obj }) => (obj.description ? obj.description : ''))
  description: string;
  @Expose()
  @Transform(({ obj }) => (obj.price ? obj.price : ''))
  price: number;
  @Expose()
  isPublished: boolean;
  @Expose()
  @Transform(({ obj }) => {
    return obj.imageUrl ? obj.imageUrl : '';
  })
  imageUrl: string;
  @Expose()
  @Type(() => ChapterSerialization)
  chapters: ChapterSerialization[];

  static fromPlain(plain: any) {
    return plainToInstance(GetCourseUserResponseSerialization, plain, {
      excludeExtraneousValues: true,
    });
  }
}
