import { Entity, Column, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { AbstractEntityIntId } from '../../abstracts/abstract.entity';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity({ name: 'auth', schema: 'public' })
export class Auth extends AbstractEntityIntId<Auth> {
  @Column({ type: 'varchar', length: 45, nullable: true })
  email: string;

  @Column({ type: 'tinyint', nullable: true })
  email_verify: boolean;

  @Column({ type: 'tinyint', nullable: true })
  is_blocked: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  user: User;

  @ManyToMany(() => Role, (role) => role.auth, {
    cascade: true,
  })
  @JoinTable()
  role: Role[];

  static async findByEmailAndRole(email: string, role: string) {
    return this.createQueryBuilder('auth')
      .select([
        'auth.email',
        'user.id',
        'student_advance.fullName',
        'student_advance.imageUrl',
      ])
      .where('auth.email = :email', { email })
      .innerJoin('auth.role', 'role')
      .andWhere('role.role_name = :role', { role: role })
      .innerJoin('auth.user', 'user')
      .andWhere('user.auth = auth.id')
      .innerJoin('user.student_advance', 'student_advance')
      .andWhere('student_advance.user = user.id')
      .getOne();
  }
}
