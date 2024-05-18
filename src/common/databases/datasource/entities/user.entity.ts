import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Auth } from './auth.entity';

import { ReigsterTutorEntity } from './user-advance.entity';
import { Course } from './course.entity';
import { StudentAdvanceEntity } from './student-advance.entity';
import { TutorAdvanceEntity } from './tutor-advance.entity';
import { ClassEntity } from './class.entity';
import { ScheduleEntity } from './schedule.entity';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
@Entity({ name: 'user', schema: 'public' })
export class User extends AbstractEntityIntId<User> {
  @Column({ type: 'varchar', length: 45, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', name: 'full_name', length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 45, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ type: 'varchar', length: 45, nullable: true })
  address: string;

  @OneToOne(() => StudentAdvanceEntity, (studentAdvance) => studentAdvance.user)
  student_advance: StudentAdvanceEntity;

  @OneToOne(() => Auth, {
    cascade: true,
  })
  @JoinColumn()
  auth: Auth;

  @Column({ type: 'json', nullable: true })
  url_cert: JSON;
  @OneToOne(() => ReigsterTutorEntity, (registerTutor) => registerTutor.user)
  registerTutor: ReigsterTutorEntity;

  @OneToOne(() => TutorAdvanceEntity, (tutor_advance) => tutor_advance.user)
  tutor_advance: TutorAdvanceEntity;
  @OneToMany(() => ClassEntity, (room) => room.tutor)
  class_tutor: ClassEntity[];
  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];
  static async findByEmailWithRelations(auth_id: number) {
    return this.findOne({
      where: { auth: { id: auth_id } },
      relations: ['auth'],
    });
  }
  @ManyToMany(() => ScheduleEntity, (schedule) => schedule.students)
  schedules: ScheduleEntity[];
  static async findUserById(id: number) {
    return this.findOne({ where: { id } });
  }
  static async findUserByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
  static async findStudentdentByTutorId(tutor_id: number) {
    return this.createQueryBuilder('user')
      .select([
        'user.email', // Trường từ bảng user
        'studentAdvance.school', // Trường cụ thể từ bảng student_advance
        // 'enroll.fieldName', // Thêm các trường từ bảng enroll nếu cần
        'studentAdvance.fullName',
        'studentAdvance.gender',
        'studentAdvance.country',
        'studentAdvance.address',
        'studentAdvance.phoneNumber',
        'studentAdvance.imageUrl',
        'studentAdvance.level',
        'studentAdvance.status',
        'studentAdvance.dateOfBirth',
      ])
      .innerJoin('user.student_advance', 'studentAdvance')
      .where('user.id = :tutor_id', { tutor_id })
      .getMany();
  }
}
