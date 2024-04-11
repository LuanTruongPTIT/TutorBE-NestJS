import { Entity, Column } from 'typeorm';
import { AbstractEntityIntId } from '../../abstracts/abstract.entity';

@Entity('auth')
export class Auth extends AbstractEntityIntId<Auth> {
  @Column({ type: 'varchar', length: 45, nullable: true })
  email: string;

  @Column({ type: 'tinyint', nullable: true })
  email_verify: boolean;

  @Column({ type: 'tinyint', nullable: true })
  is_blocked: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  password: string;
}
