import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Chapter } from './chapter.entity';
import { ClassEntity } from './class.entity';
@Entity({ name: 'lesson', schema: 'public' })
export class LessonEntity extends AbstractEntityIntId<LessonEntity> {
  @ManyToOne(() => Chapter, (chapter) => chapter.lesson)
  chapter: Chapter;

  @ManyToOne(() => ClassEntity, (room) => room.lesson)
  Class: ClassEntity;

  @Column({ type: 'boolean', default: false })
  complete: boolean;

  static async findChapterCompleteByClassId(
    class_id: number,
    course_id: number,
  ) {
    return this.find({
      where: {
        Class: { id: class_id },
        chapter: { course: { id: course_id } },
        complete: true,
      },
    });
  }
}
