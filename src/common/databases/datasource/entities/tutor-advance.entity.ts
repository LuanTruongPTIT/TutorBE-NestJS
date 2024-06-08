import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { ActivityEntity } from './activity.entity';
import { PageOptionsDto } from 'src/common/pagination/dto/page.options.dto';

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

  @Column({ type: 'varchar', length: 2000, nullable: true })
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

  @OneToMany(() => ActivityEntity, (activity) => activity.tutor)
  activities: ActivityEntity[];
  static async findTutorByTutorId(id: number) {
    return this.findOne({
      where: { user: { id: id } },
      relations: ['user', 'activities'],
    });
  }

  static async findAllTutors(pageOptionsDto: PageOptionsDto) {
    return this.createQueryBuilder('tutor_advance')
      .select([
        'tutor_advance.id',
        'tutor_advance.first_name',
        'tutor_advance.last_name',
        // 'user.email',
        'user.id',
        'user.status',
        'auth.id',
        'auth.email',
        'role.id',
        'role.role_name',
        'tutor_advance.phone_number',
        'tutor_advance.address',
        'tutor_advance.city',
        'tutor_advance.country',
        'tutor_advance.imagePhoto',
      ])
      .leftJoin('tutor_advance.user', 'user')
      .leftJoin('user.auth', 'auth')
      .leftJoin('auth.role', 'role')
      .andWhere('role.role_name = :roleName', { roleName: 'tutor' })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getMany();
  }
}
