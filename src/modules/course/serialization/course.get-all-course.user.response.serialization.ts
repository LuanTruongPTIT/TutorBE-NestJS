/* eslint-disable @typescript-eslint/no-unused-vars */
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
export class GetAllCourseUserResponseSerialization {
  @Expose()
  id: number;
  @Expose()
  title: string;

  @Expose()
  @Transform(({ obj }) => (obj.price ? obj.price : ''))
  price: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.imageUrl ? obj.imageUrl : '';
  })
  imageUrl: string;

  @Expose()
  @Transform(({ obj }) => (obj.chapters ? obj.chapters.length : 0))
  chaptersLength: number;

  static getArrayFromPlain(plain: any[]) {
    return plain.map((item) => {
      return plainToInstance(GetAllCourseUserResponseSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
