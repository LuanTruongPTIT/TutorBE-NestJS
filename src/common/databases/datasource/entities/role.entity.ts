import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntityIntId } from '../../abstracts/abstract.entity';

import { Auth } from './auth.entity';

@Entity({ name: 'role', schema: 'public' })
export class Role extends AbstractEntityIntId<Role> {
  @Column({ type: 'varchar', length: 50, nullable: true })
  role_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  role_descriptions: string;

  @ManyToMany(() => Auth, (auth) => auth.role)
  auth: Auth[];
}
