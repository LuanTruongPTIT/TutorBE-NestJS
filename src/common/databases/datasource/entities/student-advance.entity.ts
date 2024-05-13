import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { User } from './user.entity';

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
@Entity({ name: 'student_advance', schema: 'public' })
export class StudentAdvance extends AbstractEntityIntId<StudentAdvance> {
  @Column({ type: 'date', nullable: false })
  addission_date: Date;

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
}
