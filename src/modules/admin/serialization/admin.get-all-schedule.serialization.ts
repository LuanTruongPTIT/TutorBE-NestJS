import { Expose, plainToInstance, Transform } from 'class-transformer';

export class AdminGetAllScheduleSerialization {
  @Expose()
  id: number;

  @Expose()
  topic: string;

  @Expose()
  formal: string;

  @Expose()
  @Transform(({ obj }) => {
    const str = obj.status;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  })
  status: string;

  @Expose()
  @Transform(({ obj }) =>
    new Date(obj.start_date).toISOString().split('T')[1].slice(0, 5),
  )
  start_time: string;

  @Expose()
  @Transform(({ obj }) => obj.Class.name)
  class_name: string;

  @Expose()
  @Transform(({ obj }) =>
    new Date(obj.duration_time).toISOString().split('T')[1].slice(0, 5),
  )
  end_time: string;

  @Expose()
  @Transform(({ obj }) => {
    const date = new Date(obj.start_date);
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  })
  date: Date;

  @Expose()
  @Transform(({ obj }) => obj.Class.student.length)
  count_students: number;

  @Expose()
  @Transform(({ obj }) => (obj.Class.course ? obj.Class.course.title : 'N/A'))
  course_name: string;

  @Expose()
  @Transform(
    ({ obj }) => `${obj.Class.tutor.firstName} ${obj.Class.tutor.lastName}`,
  )
  tutor_name: string;

  static async fromPlainArray(plain: any[]) {
    return plain.map((item) => {
      return plainToInstance(AdminGetAllScheduleSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
