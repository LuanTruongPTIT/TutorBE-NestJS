import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { ReigsterTutorEntity } from './user-advance.entity';

@Entity({ name: 'subject', schema: 'public' })
export class SubjectEntity extends AbstractEntityIntId<SubjectEntity> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @ManyToMany(
    () => ReigsterTutorEntity,
    (register_tutor) => register_tutor.subject,
  )
  register_tutor: ReigsterTutorEntity[];

  static async findByName(name: string[]) {
    return this.createQueryBuilder('subject')
      .where('subject.name IN (:...name)', { name })
      .getMany();
  }
  static async findAllByName(name: string) {
    return this.findOne({ where: { name } });
  }
}
