import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tutor_advance', schema: 'public' })
export class TutorAdvanceEntity extends AbstractEntityIntId<TutorAdvanceEntity> {
  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bio: string;

  @Column({ type: 'json', nullable: true })
  skill: JSON;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  imagePhoto: string;

  @Column({ type: 'json', nullable: true })
  imageCert: JSON;

  @OneToOne(() => User, (user) => user.tutor_advance)
  @JoinColumn({ name: 'tutor_id' })
  user: User;

  static async findTutorByTutorId(id: number) {
    return this.findOne({
      where: { user: { id: id } },
    });
  }
}
