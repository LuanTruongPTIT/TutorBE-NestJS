import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntityIntId } from '../../abstracts/abstract.entity';
import { User } from './user.entity';

@Entity('role')
export class Role extends AbstractEntityIntId<Role> {
  @Column({ type: 'varchar', length: 50, nullable: true })
  role_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  role_descriptions: string;

  @ManyToMany(() => User, (user) => user.role)
  user: User[];
}
