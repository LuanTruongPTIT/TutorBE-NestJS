import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { User } from './user.entity';
import { TutorAdvanceEntity } from './tutor-advance.entity';

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
  Level: Level;

  @Column({ type: 'varchar', length: 100, nullable: false })
  school: string;

  @Column({ type: 'date', nullable: false, name: 'date_of_birth' })
  dateOfBirth: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_phone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  parent_country: string;

  @OneToOne(() => User, (user) => user.studentAdvance, {
    cascade: true,
  })
  @JoinColumn({ name: 'student_id' })
  user: User;

  @ManyToMany(
    () => TutorAdvanceEntity,
    (tutor_advance) => tutor_advance.student_advance,
  )
  tutor_advance: TutorAdvanceEntity[];
}
