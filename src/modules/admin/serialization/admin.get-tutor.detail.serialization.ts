import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
export class TutorClassDetail {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.name;
  })
  room: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.course.title;
  })
  course: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.startDate;
  })
  start_date: Date;

  @Expose()
  @Transform(({ obj }) => {
    return obj.endDate;
  })
  end_date: Date;

  @Expose()
  @Transform(({ obj }) => {
    return obj.status;
  })
  status: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.student.length;
  })
  count_students: number;

  @Expose()
  @Type(() => TutorActivityTimeline)
  schedule: TutorActivityTimeline[];

  @Expose()
  @Transform(({ obj }) => {
    return obj.student;
  })
  students: Record<string, any>[];
  static fromPlain(plain: any) {
    return plainToInstance(TutorClassDetail, plain, {
      excludeExtraneousValues: true,
    });
  }
}

export class TutorActivityTimeline {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => {
    return obj.topic;
  })
  topic: string;

  @Expose()
  @Transform(({ obj }) => {
    const data = new Date(obj.start_date);
    return data.toLocaleDateString() + ' ' + data.toLocaleTimeString();
  })
  start_date: Date;

  @Expose()
  @Transform(({ obj }) => {
    const data = new Date(obj.duration_time);
    return data.toLocaleDateString() + ' ' + data.toLocaleTimeString();
  })
  duration_time: Date;

  @Expose()
  @Transform(({ obj }) => {
    return obj.status;
  })
  status: string;
}

export class AdminGetTutorDetailSerialization {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Transform(({ obj }) => {
    return obj.tutor_advance.last_name + ' ' + obj.tutor_advance.first_name;
  })
  fullName: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.tutor_advance.phone_number;
  })
  phone_number: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.tutor_advance.address + ' ' + obj.tutor_advance.city;
  })
  address: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.tutor_advance.country;
  })
  country: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.tutor_advance.imagePhoto;
  })
  imagePhoto: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.tutor_advance.activities;
  })
  activities: Record<string, any>[];

  @Expose()
  @Type(() => TutorClassDetail)
  class_tutor: TutorClassDetail[];

  @Expose()
  @Transform(({ obj }) => {
    return obj.status.charAt(0).toUpperCase() + obj.status.slice(1);
  })
  status: string;
  static async fromPlain(data: any) {
    return plainToInstance(AdminGetTutorDetailSerialization, data, {
      excludeExtraneousValues: true,
    });
  }
}
