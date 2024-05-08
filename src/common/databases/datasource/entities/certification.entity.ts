import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { ReigsterTutorEntity } from './user-advance.entity';

@Entity({ name: 'certification', schema: 'public' })
export class CertificationEntity extends AbstractEntityIntId<CertificationEntity> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  cert_name: string;

  @OneToOne(
    () => ReigsterTutorEntity,
    (register_tutor) => register_tutor.certification,
  )
  register_tutor: ReigsterTutorEntity;
}
