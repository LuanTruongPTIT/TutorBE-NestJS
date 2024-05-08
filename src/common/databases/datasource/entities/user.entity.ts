import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Auth } from './auth.entity';

import { ReigsterTutorEntity } from './user-advance.entity';

@Entity({ name: 'user', schema: 'public' })
export class User extends AbstractEntityIntId<User> {
  @Column({ type: 'varchar', length: 45, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', name: 'full_name', length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  email: string;
  @Column({ type: 'varchar', length: 45, nullable: true })
  country_of_origin: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  phoneNumber: string;

  @OneToOne(() => Auth, {
    cascade: true,
  })
  @JoinColumn()
  auth: Auth;

  // status:
  @Column({ type: 'json', nullable: true })
  url_cert: JSON;
  @OneToOne(() => ReigsterTutorEntity, (registerTutor) => registerTutor.user)
  registerTutor: ReigsterTutorEntity;
  static async findByEmailWithRelations(auth_id: number) {
    return this.findOne({
      where: { auth: { id: auth_id } },
      relations: ['auth'],
      // select: ['fullName', 'auth'],
    });
  }
}
