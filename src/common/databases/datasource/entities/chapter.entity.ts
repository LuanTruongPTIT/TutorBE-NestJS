import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Course } from './course.entity';

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
}
