import {
  Column,
  Entity,
  In,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { SubjectEntity } from './subject.entity';
import { District } from './district.entity';
import { User } from './user.entity';
import { ImageEntity } from './image.entity';
import { CertificationEntity } from './certification.entity';

export enum DegreeType {
  COLLEGE = 'college',
  UNIVERSITY = 'university',
}
export enum ApplicationStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  INTERVIEW = 'interview',
  COMPLETE = 'complete',
}
@Entity({ name: 'register_tutor', schema: 'public' })
export class ReigsterTutorEntity extends AbstractEntityIntId<ReigsterTutorEntity> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  college: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  degree: string;

  @Column({ type: 'enum', enum: DegreeType, nullable: true })
  degree_type: DegreeType;

  @Column({ type: 'varchar', length: 100, nullable: true })
  specializations: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bio: string;

  @Column({ type: 'int', nullable: true })
  salary: number;

  @Column({ type: 'tinyint', nullable: true })
  is_age_18: number;

  @ManyToMany(() => SubjectEntity, (subject) => subject.register_tutor, {
    cascade: true,
  })
  @JoinTable()
  subject: SubjectEntity[];

  @ManyToMany(() => District, (district) => district.register_tutor, {
    cascade: true,
  })
  @JoinTable()
  district: District[];
  @Column({ type: 'int', nullable: true })
  start_date_study_year: number;

  @Column({ type: 'int', nullable: true })
  end_date_study_year: number;
  @OneToOne(() => User, (user) => user.registerTutor, {
    cascade: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => ImageEntity, (image) => image.register_tutor, {
    cascade: true,
  })
  image: ImageEntity[];

  @Column({ type: 'boolean', default: false })
  isRead: boolean;
  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    nullable: true,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  position: string;

  read: boolean;
  topic: string;
  label: string[];
  @OneToOne(
    () => CertificationEntity,
    (certification) => certification.register_tutor,
  )
  certification: CertificationEntity;

  static async getApplicationTutor() {
    return this.find({
      where: {
        status: ApplicationStatus.PENDING,
      },
      relations: ['user', 'subject', 'image'],
      select: ['user', 'status', 'createdAt', 'id'],
    });
  }

  static async getApplicationTutorById(id: number) {
    return this.findOne({
      where: { id },
      relations: ['user', 'subject', 'image'],
      select: ['user', 'status', 'createdAt', 'id', 'updatedAt'],
    });
  }
  static async getApplicationTutorDetailById(id: number) {
    return this.findOne({
      where: { id },
      relations: ['user', 'subject', 'image'],
      select: [
        'user',
        'createdAt',
        'id',
        'start_date_study_year',
        'end_date_study_year',
        'degree',
        'degree_type',
        'bio',
        'salary',
        'college',
        'specializations',
      ],
    });
  }

  static async getApplicationTutorReview() {
    return this.find({
      where: {
        status: In([ApplicationStatus.IN_PROGRESS, ApplicationStatus.REJECTED]),
      },
      relations: ['user', 'subject', 'image'],
      select: ['user', 'status', 'createdAt', 'id'],
    });
  }

  static async updateStatus(id: number, status: ApplicationStatus) {
    return this.update({ id }, { status });
  }

  static async getAllAplicationTutorInterview() {
    //     SELECT
    //     userAdvance.user,
    //     userAdvance.status,
    //     userAdvance.createdAt,
    //     userAdvance.id,
    //     user.*,
    //     subject.*,
    //     image.*
    // FROM
    //     userAdvance
    // INNER JOIN
    //     user ON userAdvance.userId = user.id
    // INNER JOIN
    //     subject ON userAdvance.subjectId = subject.id
    // INNER JOIN
    //     image ON userAdvance.imageId = image.id
    // WHERE
    //     userAdvance.status = 'INTERVIEW';
    return this.find({
      where: {
        status: In([
          ApplicationStatus.INTERVIEW,
          ApplicationStatus.APPROVED,
          ApplicationStatus.REJECTED,
          ApplicationStatus.COMPLETE,
        ]),
      },
      relations: ['user', 'subject', 'image'],
      select: ['user', 'status', 'updatedAt', 'id'],
    });
  }
}
