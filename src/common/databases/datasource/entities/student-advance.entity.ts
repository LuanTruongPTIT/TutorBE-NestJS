import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { User } from './user.entity';
import { ClassEntity } from './class.entity';
import { AttendanceEntity } from './attendance.entity';

export enum Level {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
  QUATERNARY = 'QUATERNARY',
  QUINARY = 'QUINARY',
  SENIORITY = 'SENIORITY',
  POSTGRADUATE = 'POSTGRADUATE',
  DOCTORATE = 'DOCTORATE',
}
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
export enum status_student_enum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}
@Entity({ name: 'student_advance', schema: 'public' })
export class StudentAdvanceEntity extends AbstractEntityIntId<StudentAdvanceEntity> {
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

  @Column({ type: 'enum', enum: Level, nullable: false })
  level: Level;

  @Column({ type: 'varchar', length: 100, nullable: false })
  school: string;

  @Column({ type: 'date', nullable: false, name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_name: string;

  @Column({
    type: 'enum',
    enum: status_student_enum,
    nullable: false,
    default: status_student_enum.ACTIVE,
  })
  status: status_student_enum;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_country: string;

  @OneToOne(() => User, (user) => user.student_advance, {
    cascade: true,
  })
  @JoinColumn({ name: 'student_id' })
  user: User;

  @Column({ type: 'varchar', length: 200, nullable: true })
  imageUrl: string;

  @ManyToMany(() => ClassEntity, (classEntity) => classEntity.student, {
    cascade: true,
  })
  Class: ClassEntity[];

  @OneToMany(() => AttendanceEntity, (attendance) => attendance.student)
  attendances: AttendanceEntity[];
  static async findStudentByEmai(email: string) {
    const result = await this.createQueryBuilder('student_advance')
      .where('student_advance.email = :email', { email })
      .select([
        'student_advance.id',
        'student_advance.fullName',
        'student_advance.email',
        'student_advance.imageUrl',
      ])
      .getOne();
    return result;
  }
  static async findStudentByStudentId(id: number) {
    return this.findOne({
      where: { user: { id: id } },
    });
  }

  static async updateStudentAdvanceById(
    id: number,
    data: Partial<StudentAdvanceEntity>,
  ) {
    return this.update({ id }, data);
  }

  static async findAllStudent() {
    return (
      this.createQueryBuilder('student_advance')
        .select([
          'student_advance.id',
          'student_advance.firstName',
          'student_advance.lastName',
          'student_advance.email',
          'student_advance.imageUrl',
          'student_advance.phoneNumber',
          'student_advance.country',
          'student_advance.status',
          'student_advance.gender',
          'student_advance.address',
          'student_advance.level',
          'student_advance.school',
          'student_advance.parent_name',
          'role.id',
          'role.role_name',
          'student_advance.createdAt',
        ])
        .leftJoin('student_advance.user', 'user')
        .leftJoin('user.auth', 'auth')
        .leftJoin('auth.role', 'role')
        .where('role.role_name = :role', { role: 'student' })
        // .getSql();
        .getMany()
    );
  }
}
