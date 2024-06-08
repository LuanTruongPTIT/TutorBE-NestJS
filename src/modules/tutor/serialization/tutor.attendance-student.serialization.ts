import { Expose, plainToInstance, Transform } from 'class-transformer';

export class TutorAttendanceStudentSerialization {
  @Expose()
  @Transform(({ obj }) => {
    return obj.id;
  })
  attendance_id: number;

  @Expose()
  @Transform(({ obj }) => {
    console.log(obj);
    const dateStr = obj.schedule.date;
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${month.toString().padStart(2, '0')}/${year}`;
    return formattedDate;
  })
  date: string;

  @Expose()
  day: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.schedule.Class.name;
  })
  Class: string;

  @Expose()
  present: boolean;

  @Expose()
  @Transform(({ obj }) => {
    return obj.student.id;
  })
  studentId: number;
  @Expose()
  @Transform(({ obj }) => {
    return obj.student.fullName;
  })
  name: string;

  @Expose()
  @Transform(({ obj }) => {
    console.log(obj);
    return obj.schedule.Class.id;
  })
  classId: number;
  static fromPlainArray(plain: any[]) {
    return plain.map((item) => {
      return plainToInstance(TutorAttendanceStudentSerialization, item, {
        excludeExtraneousValues: true,
      });
    });
  }
}
