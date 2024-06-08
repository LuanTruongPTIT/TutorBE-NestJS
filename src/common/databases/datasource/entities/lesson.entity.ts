import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Chapter } from './chapter.entity';
import { ClassEntity } from './class.entity';
import { ScheduleEntity } from './schedule.entity';
@Entity({ name: 'lesson', schema: 'public' })
export class LessonEntity extends AbstractEntityIntId<LessonEntity> {
  @ManyToOne(() => Chapter, (chapter) => chapter.lesson)
  chapter: Chapter;

  @ManyToOne(() => ClassEntity, (room) => room.lesson)
  Class: ClassEntity;

  @Column({ type: 'boolean', default: false })
  complete: boolean;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.lesson)
  schedule: ScheduleEntity[];
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
      relations: ['chapter'],
    });
  }

  static async findLessonByChapterIdAndClassId(
    chapter_id: number,
    class_id: number,
  ) {
    return await this.findOne({
      where: { chapter: { id: chapter_id }, Class: { id: class_id } },
    });
  }
}
