import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { StudentAdvanceEntity } from './student-advance.entity';

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
  user: User;

  @ManyToMany(
    () => StudentAdvanceEntity,
    (student_advance) => student_advance.tutor_advance,
  )
  @JoinTable()
  student_advance: StudentAdvanceEntity[];
}
