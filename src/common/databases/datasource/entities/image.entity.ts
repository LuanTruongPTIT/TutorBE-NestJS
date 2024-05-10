import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ReigsterTutorEntity } from './user-advance.entity';
import { Courses } from './courses.entity';

@Entity({ name: 'image', schema: 'public' })
export class ImageEntity extends AbstractEntityIntId<ImageEntity> {
  @Column({ type: 'varchar', length: 2000, nullable: true })
  image_url: string;

  @ManyToOne(
    () => ReigsterTutorEntity,
    (register_tutor) => register_tutor.image,
  )
  register_tutor: ReigsterTutorEntity[];

  @ManyToOne(() => Courses, (courses) => courses.image)
  courses: Courses[];
}
