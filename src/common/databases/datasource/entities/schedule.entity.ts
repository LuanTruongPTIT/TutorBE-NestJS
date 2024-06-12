import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { ClassEntity } from './class.entity';
import { AttendanceEntity } from './attendance.entity';
export enum Formal {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}
export enum scheduleStatus {
  PENDING = 'Pending',
  CANCELED = 'Canceled',
  INPROGRESS = 'In Progress',
  DONE = 'Completed',
}
@Entity({ name: 'schedule', schema: 'public' })
export class ScheduleEntity extends AbstractEntityIntId<ScheduleEntity> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  topic: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.schedule, {
    cascade: true,
  })
  @JoinTable({
    name: 'schedule_lesson',
  })
  lesson: LessonEntity;

  @Column({ type: 'enum', enum: Formal, default: 'Online' })
  formal: Formal;

  @ManyToOne(() => ClassEntity, (room) => room.schedule, {
    cascade: true,
  })
  Class: ClassEntity;
  @Column({ type: 'datetime', nullable: true })
  start_date: Date;

  @Column({ type: 'datetime', nullable: true })
  duration_time: Date;

  @Column({ type: 'varchar', nullable: true })
  date: string;
  @Column({ type: 'varchar', length: 100, nullable: true })
  reason_cancel: string;

  @Column({ type: 'enum', enum: scheduleStatus, default: 'Pending' })
  status: scheduleStatus;

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.schedule)
  attendances: AttendanceEntity[];
  static async findAllScheduleByDate(date: string, tutor_id: number) {
    console.log('date', date);
    // return this.find({
    //   where: {
    //     date: date,
    //   },
    //   relations: ['Class'],

    // });
    return this.createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.Class', 'class')
      .where('class.tutor = :tutor_id', { tutor_id })
      .andWhere('schedule.date = :date', { date })
      .getMany();
  }

  static async findAllSchedule(tutor_id: number) {
    return this.createQueryBuilder('schedule')
      .select([
        'schedule.id',
        'schedule.topic',
        'schedule.date',
        'schedule.formal',
        'schedule.status',
        'schedule.start_date',
        'schedule.duration_time',
        'class.id',
        'class.name',
        'course.id',
        'course.title',
      ])
      .leftJoin('schedule.Class', 'class')
      .leftJoin('class.course', 'course')
      .addSelect(['course.title'])
      .where('class.tutor = :tutor_id', { tutor_id })

      .getMany();
  }
  static async findScheduleById(schedule_id: number, tutor_id: number) {
    return this.createQueryBuilder('schedule')
      .select([
        'schedule.id',
        'schedule.topic',
        'schedule.date',
        'schedule.formal',
        'schedule.status',
        'schedule.start_date',
        'schedule.duration_time',
        'class.id',
        'class.name',
        'course.id',
        'course.title',
        'student.id',
        'student.imageUrl',
        'lesson.id',
        'chapter.id',
        'chapter.title',
        'chapter.position',
      ])
      .leftJoin('schedule.Class', 'class')
      .leftJoin('class.student', 'student')
      .leftJoin('class.course', 'course')
      .leftJoin('class.lesson', 'lesson')
      .leftJoin('lesson.chapter', 'chapter')
      .addSelect(['course.title'])
      .where('schedule.id = :schedule_id', { schedule_id })
      .andWhere('class.tutor = :tutor_id', { tutor_id })
      .andWhere('lesson.id = schedule.lessonId')
      .getOne();
  }

  static async findScheduleByStartDate(date: string, class_id: number) {
    // return this.findOne({ where: { date: date, Class: { id: class_id } } });
    return await this.createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.Class', 'class')
      .leftJoinAndSelect('class.student', 'student')
      .where('class.id = :class_id', { class_id })
      .andWhere('student.id = :student_id', { student_id: 2 })
      .andWhere('schedule.date = :date', { date })
      .getOne();
  }

  static async findAllScheduleByAdmin() {
    return this.createQueryBuilder('schedule')
      .select([
        'course.id',
        'course.title',
        'class.id',
        'class.name',
        'tutor.id',
        'tutor.firstName',
        'tutor.lastName',
        'student.id',
        'schedule.id',
        'schedule.topic',
        'schedule.start_date',
        'schedule.duration_time',
        'schedule.formal',
        'schedule.status',
        'schedule.reason_cancel',
      ])
      .leftJoin('schedule.Class', 'class')
      .leftJoin('class.student', 'student')
      .leftJoin('class.course', 'course')
      .leftJoin('class.tutor', 'tutor')
      .orderBy('schedule.date', 'ASC')
      .getMany();
    // .getSql()
  }
}
