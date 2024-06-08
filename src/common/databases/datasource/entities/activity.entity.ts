import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TutorAdvanceEntity } from './tutor-advance.entity';
@Entity({ name: 'activity', schema: 'public' })
export class ActivityEntity extends AbstractEntityIntId<ActivityEntity> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  organization_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  achivements: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  start_year: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  end_year: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  link_credential: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  imageOrganization: string;

  @ManyToOne(() => TutorAdvanceEntity, (tutor) => tutor.activities)
  tutor: TutorAdvanceEntity;
}
