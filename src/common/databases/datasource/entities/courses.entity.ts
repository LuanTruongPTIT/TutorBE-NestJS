import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ImageEntity } from './image.entity';
import { Chapter } from './chapter.entity';

@Entity({ name: 'course', schema: 'public' })
export class Courses extends AbstractEntityIntId<Courses> {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.courses, {
    cascade: true,
  })
  user: User[];

  @OneToMany(() => ImageEntity, (image) => image.courses)
  image: ImageEntity;

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapter: Chapter;
}
