import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { StudentAdvanceEntity } from './student-advance.entity';
import { ScheduleEntity } from './schedule.entity';
import { ClassEntity } from './class.entity';

export enum status_attendance {
  CANCEL = 'Cancel',
  DONE = 'Done',
}
@Entity({ name: 'attendance', schema: 'public' })
export class AttendanceEntity extends AbstractEntityIntId<AttendanceEntity> {
  @ManyToOne(() => StudentAdvanceEntity, (student) => student.attendances)
  student: StudentAdvanceEntity;

  @Column({ type: 'boolean', nullable: false })
  present: boolean;

  @Column({ type: 'int' })
  day: number;

  @ManyToOne(() => ScheduleEntity, (schedule) => schedule.attendances)
  schedule: ScheduleEntity;
  @Column({ type: 'enum', enum: status_attendance })
  status: status_attendance;
  static async findAllAttendanceOfClass(
    class_id: number,
    tutor_id: number,
    start_date: string,
    end_date: string,
  ) {
    console.log(class_id, tutor_id, start_date, end_date);
    console.log(class_id, tutor_id, start_date, end_date);
    const data = await this.createQueryBuilder('attendance')
      .select([
        'attendance.id',
        'attendance.present',
        'attendance.day',
        'schedule.id',
        'schedule.date',
        'student.id',
        'class.id',
        'class.name',
        'student.fullName',
      ])
      .leftJoin('attendance.student', 'student')
      .leftJoin('attendance.schedule', 'schedule')
      .leftJoin('schedule.Class', 'class')
      .where('schedule.Class = :class_id', { class_id })
      .andWhere('class.tutor = :tutor_id', { tutor_id })
      .andWhere('schedule.start_date >= :start_date', {
        start_date: start_date,
      })
      .andWhere('schedule.duration_time <= :end_date', { end_date: end_date })
      .getMany();
    if (data.length == 0) {
      const checkClass = await ClassEntity.findOne({
        where: {
          id: class_id,
          tutor: {
            id: tutor_id,
          },
        },
      });
      console.log(checkClass);
      return [
        {
          attendance_id: null,
          date: null,
          // day: 23,
          room: checkClass.name,
          present: false,
          studentId: 0,
        },
      ];
    }
    return data;
  }
}
