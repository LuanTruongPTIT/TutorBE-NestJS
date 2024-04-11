import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Auth } from './auth.entity';
import { Role } from './role.entity';

@Entity('user')
export class User extends AbstractEntityIntId<User> {
  @Column({ type: 'varchar', length: 45, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', name: 'full_name', length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  country_of_origin: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  phoneNumber: string;

  @Column({ type: 'tinyint', nullable: true })
  is_age_18: number;

  @OneToOne(() => Auth, {
    cascade: true,
  })
  @JoinColumn()
  auth: Auth;

  @ManyToMany(() => Role, (role) => role.user, {
    cascade: true,
  })
  @JoinTable()
  role: Role[];
}
