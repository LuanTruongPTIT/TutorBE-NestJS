import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';

import { Course } from './course.entity';
import { User } from './user.entity';
import { StudentAdvanceEntity } from './student-advance.entity';
import { LessonEntity } from './lesson.entity';
export enum EnrollStatusEnum {
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  DELETED = 'DELETED',
  BLOCKED = 'BLOCKED',
}
@Entity({ name: 'class', schema: 'public' })
export class ClassEntity extends AbstractEntityIntId<ClassEntity> {
  @ManyToOne(() => User, (tutor) => tutor.class_tutor, {
    cascade: true,
  })
  tutor: User;

  @ManyToMany(() => StudentAdvanceEntity, (student) => student.Class)
  @JoinTable({ name: 'student_class' })
  student: StudentAdvanceEntity[];

  @Column({
    type: 'enum',
    enum: EnrollStatusEnum,
    default: EnrollStatusEnum.ONGOING,
  })
  status: EnrollStatusEnum;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;
  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ManyToOne(() => Course, (course) => course.Class)
  course: Course;

  @OneToMany(() => LessonEntity, (lesson) => lesson.Class)
  lesson: LessonEntity[];
  static async findAllStudentEnrollByCourseId(
    tutor_id: number,
    course_id: number,
  ) {
    return this.createQueryBuilder('enroll')
      .addSelect([
        'student.email',
        'student_advance.fullName',
        'student_advance.imageUrl',
      ])
      .innerJoin('enroll.tutor', 'tutor')
      .where('tutor.id = :tutor_id', { tutor_id })
      .innerJoin('enroll.student', 'student')
      .innerJoin('student.student_advance', 'student_advance')
      .andWhere('student_advance.user = student.id')
      .innerJoin('enroll.course', 'course')
      .andWhere('course.id = :course_id', { course_id })
      .getMany();
  }
  static async findStudentdentByTutorId(tutor_id: number) {
    const data = await this.createQueryBuilder('class')
      .innerJoinAndSelect('class.student', 'student')
      .where('class.tutor = :tutor_id', { tutor_id })
      .distinct(true) // Chỉ lấy các bản ghi duy nhất
      .getMany();
    return data;
  }

  static async findAllClassByTutor(tutor_id: number) {
    return this.createQueryBuilder('class')
      .addSelect(['course.title'])
      .innerJoin('class.tutor', 'tutor')
      .innerJoin('class.course', 'course')
      .where('class.course = course.id')
      .andWhere('tutor.id = :tutor_id', { tutor_id })
      .getMany();
  }

  static async findCourseByClassOfTutor(class_id: number, tutor_id: number) {
    return this.createQueryBuilder('class')
      .select(['class.id', 'class.name', 'course.title']) // Chọn thêm các cột từ bảng class
      .innerJoin('class.course', 'course')
      .where('class.tutor = :tutor_id', { tutor_id })
      .andWhere('course.id = class.courseId')

      .andWhere('class.id = :class_id', { class_id })
      .getOne();
  }
  static async findClassByClassNameAndCourse(
    class_name: string,
    course_name: string,
  ) {
    return this.findOne({
      where: { name: class_name, course: { title: course_name } },
    });
  }

  static async findStudentJoinInClass(
    class_id: number,
    tutor_id: number,
    student_id: number,
  ) {
    console.log(
      'class_id',
      class_id,
      'tutor_id',
      tutor_id,
      'student_id',
      student_id,
    );
    return this.createQueryBuilder('class')
      .select(['class.id', 'class.name'])
      .innerJoin('class.student', 'student')
      .where('class.id = :class_id', { class_id })
      .andWhere('class.tutor = :tutor_id', { tutor_id })
      .andWhere('student.id = :student_id', { student_id })
      .getOne();
  }
  static async findClassById(class_name: string, tutor_id: number) {
    return this.findOne({
      where: { name: class_name, tutor: { id: tutor_id } },
    });
  }

  static async findClassByNames(class_name: string) {
    return this.findOne({
      where: { name: class_name },
    });
  }
}
