import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';
import { Chapter } from './chapter.entity';
export enum Formal {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
}
export enum scheduleStatus {
  PENDING = 'Pending',
  CANCELED = 'Canceled',
  INPROGRESS = 'InProgress',
  DONE = 'Done',
}
@Entity({ name: 'schedule', schema: 'public' })
export class ScheduleEntity extends AbstractEntityIntId<ScheduleEntity> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  topic: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string;

  @ManyToOne(() => Course, (course) => course.schedules, {
    cascade: true,
  })
  Course: Course;

  @ManyToMany(() => User, (student) => student.schedules, {
    cascade: true,
  })
  @JoinTable({
    name: 'schedule_student',
  })
  students: User[];
  @ManyToOne(() => Chapter, (chapter) => chapter.schedules, {
    cascade: true,
  })
  chapter: Chapter;

  @Column({ type: 'enum', enum: Formal, default: 'Online' })
  formal: Formal;

  @Column({ type: 'datetime', nullable: true })
  start_date: Date;

  @Column({ type: 'int', nullable: true })
  duration_time: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  reason_cancel: string;

  @Column({ type: 'enum', enum: scheduleStatus, default: 'Pending' })
  status: scheduleStatus;
}
