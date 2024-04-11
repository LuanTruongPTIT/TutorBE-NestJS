import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity<Entity> extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({})
  deletedAt: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;
  constructor(partial?: Partial<Entity>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
export abstract class AbstractEntityIntId<
  Entity,
> extends AbstractEntity<Entity> {
  @PrimaryGeneratedColumn()
  id: number;
}
