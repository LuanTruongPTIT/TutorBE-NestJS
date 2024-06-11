import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Auth } from './auth.entity';

import { ReigsterTutorEntity } from './user-advance.entity';
import { Course } from './course.entity';
import { StudentAdvanceEntity } from './student-advance.entity';
import { TutorAdvanceEntity } from './tutor-advance.entity';
import { ClassEntity } from './class.entity';
import { PageOptionsDto } from 'src/common/pagination/dto/page.options.dto';
export enum UserStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}
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
  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;
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
  static async GetAllUserByAdmin(pageOptionsDto: PageOptionsDto) {
    return this.createQueryBuilder('user')
      .select([
        'auth.email',
        'user.id',
        'user.fullName',
        'role.role_name',
        'user.status',
        'user.createdAt',
      ])
      .leftJoin('user.auth', 'auth')
      .leftJoin('auth.role', 'role')
      .andWhere('role.role_name = :role', { role: 'user' })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getMany();
  }
  // static async findTutorDetailById(id: number) {
  //   const today = new Date();
  //   const firstDayOfWeek = new Date(
  //     today.setDate(today.getDate() - today.getDay()),
  //   );
  //   const lastDayOfWeek = new Date(
  //     today.setDate(today.getDate() - today.getDay() + 6),
  //   );

  //   console.log(
  //     'firstDayOfWeek',
  //     firstDayOfWeek.toString(),
  //     lastDayOfWeek.toString(),
  //   );
  //   const data = await this.createQueryBuilder('user')
  //     .select([
  //       'user.id',
  //       'user.createdAt',
  //       'tutor_advance.id',
  //       'user.email',
  //       'tutor_advance.first_name',
  //       'tutor_advance.last_name',
  //       'tutor_advance.phone_number',
  //       'tutor_advance.address',
  //       'tutor_advance.city',
  //       'tutor_advance.country',
  //       'tutor_advance.imagePhoto',
  //       'tutor_advance.email',
  //       'course.title',
  //       'class_tutor.startDate',
  //       'class_tutor.endDate',
  //       'class_tutor.status',
  //       'student.id',
  //       'student.imageUrl',
  //       'student.fullName',
  //       'schedule.id',
  //       'schedule.topic',
  //       'schedule.start_date',
  //       'schedule.duration_time',
  //       'schedule.status',
  //       'activity.id',
  //       'activity.organization_name',
  //       'activity.achivements',
  //       'activity.start_year',
  //       'activity.end_year',
  //       'activity.link_credential',
  //       'activity.imageOrganization',
  //     ])
  //     .innerJoin('user.tutor_advance', 'tutor_advance')
  //     .innerJoin('tutor_advance.activities', 'activity')
  //     .innerJoin('user.class_tutor', 'class_tutor')
  //     .innerJoin('class_tutor.course', 'course')
  //     .innerJoin('class_tutor.schedule', 'schedule')
  //     .innerJoin('class_tutor.student', 'student')
  //     .where('user.id = :id', { id })
  //     // .andWhere(
  //     //   'schedule.start_date BETWEEN :firstDayOfWeek AND :lastDayOfWeek',
  //     //   {
  //     //     firstDayOfWeek,
  //     //     lastDayOfWeek,
  //     //   },
  //     // )
  //     .andWhere(
  //       'schedule.start_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL DAYOFWEEK(CURRENT_DATE()) - 1 DAY) AND DATE_ADD(CURRENT_DATE(), INTERVAL 7 - DAYOFWEEK(CURRENT_DATE()) DAY)',
  //     )
  //     .getOne();
  //   return data;
  // }
  static async findTutorDetailById(id: number) {
    const startDate =
      'DATE_ADD(CURRENT_DATE(), INTERVAL - WEEKDAY(CURRENT_DATE()) DAY)';
    const endDate =
      'DATE_ADD(CURRENT_DATE(), INTERVAL 7 - WEEKDAY(CURRENT_DATE()) DAY)';

    const data = await this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.createdAt',
        'tutor_advance.id',
        'user.email',
        'user.status',
        'tutor_advance.first_name',
        'tutor_advance.last_name',
        'tutor_advance.phone_number',
        'tutor_advance.address',
        'tutor_advance.city',
        'tutor_advance.country',
        'tutor_advance.imagePhoto',
        'tutor_advance.email',
        'course.title',
        'class_tutor.name',
        'class_tutor.startDate',
        'class_tutor.endDate',
        'class_tutor.status',
        'student.id',
        'student.imageUrl',
        'student.fullName',
        'schedule.id',
        'schedule.topic',
        'schedule.start_date',
        'schedule.duration_time',
        'schedule.status',
        'activity.id',
        'activity.organization_name',
        'activity.achivements',
        'activity.start_year',
        'activity.end_year',
        'activity.link_credential',
        'activity.imageOrganization',
      ])
      .innerJoin('user.tutor_advance', 'tutor_advance')
      .innerJoin('tutor_advance.activities', 'activity')
      .innerJoin('user.class_tutor', 'class_tutor')
      .innerJoin('class_tutor.course', 'course')
      .innerJoin('class_tutor.schedule', 'schedule')
      .innerJoin('class_tutor.student', 'student')
      .where('user.id = :id', { id })
      .andWhere(`schedule.start_date BETWEEN ${startDate} AND ${endDate}`)
      .orderBy('schedule.start_date', 'ASC')
      .getOne();
    if (!data) {
      console.log('Data is not found');
      const data = await this.createQueryBuilder('user')
        .select([
          'user.id',
          'user.createdAt',
          'tutor_advance.id',
          'user.email',
          'user.status',
          'tutor_advance.first_name',
          'tutor_advance.last_name',
          'tutor_advance.phone_number',
          'tutor_advance.address',
          'tutor_advance.city',
          'tutor_advance.country',
          'tutor_advance.imagePhoto',
          'tutor_advance.email',
          'course.title',
          'class_tutor.name',
          'class_tutor.startDate',
          'class_tutor.endDate',
          'class_tutor.status',
          'student.id',
          'student.imageUrl',
          'student.fullName',
          'activity.id',
          'activity.organization_name',
          'activity.achivements',
          'activity.start_year',
          'activity.end_year',
          'activity.link_credential',
          'activity.imageOrganization',
        ])
        .leftJoin('user.tutor_advance', 'tutor_advance')
        .leftJoin('tutor_advance.activities', 'activity')
        .leftJoin('user.class_tutor', 'class_tutor')
        .leftJoin('class_tutor.course', 'course')
        .leftJoin('class_tutor.student', 'student')
        .where('user.id = :id', { id })
        .getOne();
      return data;
    }
    return data;
  }
}
