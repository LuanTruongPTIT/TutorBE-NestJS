import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Courses } from './courses.entity';

@Entity({ name: 'chapter', schema: 'public' })
export class Chapter extends AbstractEntityIntId<Chapter> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  video_url: string;

  @Column({ type: 'int', nullable: true })
  position: number;

  @Column({ type: 'boolean', nullable: true })
  isPublished: boolean;

  @Column({ type: 'boolean', nullable: true })
  isFree: boolean;

  @ManyToOne(() => Courses, (course) => course.chapter, {
    cascade: true,
  })
  course: Courses[];
}
