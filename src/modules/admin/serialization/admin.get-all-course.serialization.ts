import { Expose, plainToInstance, Transform, Type } from 'class-transformer';

export class CountStudent {
  @Expose()
  @Transform(({ obj }) => {})
  count: number;
}
export class AdminGetAllCourseSerialization {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj?.price;
  })
  fee: number;

  @Expose()
  @Transform(({ obj }) => {
    console.log(obj);
    const lengthClass = obj.Class.length;
    let count: number;
    if (lengthClass !== 0) {
      for (let i = 0; i < lengthClass - 1; i++) {
        console.log(obj);
        count += obj.Class[i].student.length;
      }
      return count;
    }
    return 0;
  })
  count: CountStudent;

  @Expose()
  @Transform(({ obj }) => {
    return obj.Class.find((item) => {
      if (item.tutor) {
        return item?.lastName + ' ' + item?.firstName;
      }
    });
  })
  tutor: string;

  @Expose()
  createAt: string;

  static async fromPlainArray(plain: any[]) {
    return plain.map((item) => {
      return plainToInstance(AdminGetAllCourseSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
