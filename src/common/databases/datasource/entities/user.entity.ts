import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Auth } from './auth.entity';

import { ReigsterTutorEntity } from './user-advance.entity';
import { Course } from './course.entity';
import { StudentAdvanceEntity } from './student-advance.entity';
import { TutorAdvanceEntity } from './tutor-advance.entity';
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
  studentAdvance: StudentAdvanceEntity;
  @OneToOne(() => Auth, {
    cascade: true,
  })
  @JoinColumn()
  auth: Auth;

  // status:
  @Column({ type: 'json', nullable: true })
  url_cert: JSON;
  @OneToOne(() => ReigsterTutorEntity, (registerTutor) => registerTutor.user)
  registerTutor: ReigsterTutorEntity;

  @OneToOne(() => TutorAdvanceEntity, (tutor_advance) => tutor_advance.user)
  tutor_advance: TutorAdvanceEntity;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];
  static async findByEmailWithRelations(auth_id: number) {
    return this.findOne({
      where: { auth: { id: auth_id } },
      relations: ['auth'],
      // select: ['fullName', 'auth'],
    });
  }

  static async findUserById(id: number) {
    return this.findOne({ where: { id } });
  }
  static async findUserByEmail(email: string) {
    return this.findOne({ where: { email } });
  }
}
