import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { ScheduleEntity } from './schedule.entity';
import { LessonEntity } from './lesson.entity';

@Entity({ name: 'chapter', schema: 'public' })
export class Chapter extends AbstractEntityIntId<Chapter> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  video_url: string;

  @Column({ type: 'int', default: 1 })
  position: number;

  @Column({ type: 'boolean', nullable: true })
  isPublished: boolean;

  @Column({ type: 'boolean', nullable: true })
  isFree: boolean;

  @ManyToOne(() => Course, (course) => course.chapters, {
    cascade: true,
  })
  course: Course;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.chapter)
  schedules: ScheduleEntity[];

  @OneToMany(() => LessonEntity, (lesson) => lesson.chapter)
  lesson: LessonEntity[];
  static async findLastChapterByCourseId(courseId: number) {
    return this.createQueryBuilder('chapter')
      .where('chapter.course.id = :courseId', { courseId })
      .orderBy('chapter.position', 'DESC')
      .getOne();
  }

  static async findChapterById(id: number, id_course: number) {
    return this.findOne({
      where: { id, course: { id: id_course } },
    });
  }
  static async findChapterNotCompleteByClassId(
    class_id: number,
    course_id: number,
  ) {
    return this.createQueryBuilder('chapter')
      .innerJoinAndSelect('chapter.lesson', 'lesson')
      .innerJoinAndSelect('lesson.Class', 'class')
      .innerJoinAndSelect('class.course', 'course') // Giả sử mối quan hệ giữa Class và Course đã được thiết lập
      .where('class.id = :class_id', { class_id })
      .andWhere('course.id = :course_id', { course_id }) // Thêm điều kiện lọc theo courseId
      .andWhere('lesson.complete = :complete', { complete: false })
      .getMany();
  }
  static async findChapterByCourseId(course_id: number, class_id: number) {
    // return this.createQueryBuilder('chapter')
    //   .innerJoinAndSelect('chapter.course', 'course')
    //   .innerJoinAndSelect('course.Class', 'class')
    //   .where('course.id = :course_id', { course_id })
    //   .andWhere('class.id = :class_id', { class_id })
    //   .getMany();
    // return this.createQueryBuilder('chapter')
    //   .innerJoinAndSelect('chapter.course', 'course')
    //   .innerJoinAndSelect('course.Class', 'class')
    //   .where('course.id = :course_id', { course_id })
    //   .andWhere('class.id = :class_id', { class_id })
    //   .select(['chapter.id', 'course', 'class'])
    //   .getMany();
    const chapters = await this.createQueryBuilder('chapter')
      .innerJoinAndSelect('chapter.course', 'course')
      .innerJoinAndSelect('course.Class', 'class')
      .where('course.id = :course_id', { course_id })
      .andWhere('class.id = :class_id', { class_id })
      .getMany();
    return chapters;
  }
}
