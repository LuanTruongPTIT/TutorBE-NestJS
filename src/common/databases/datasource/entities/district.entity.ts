import { Column, Entity, ManyToMany } from 'typeorm';
import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { ReigsterTutorEntity } from './user-advance.entity';
// ORM
@Entity({ name: 'district', schema: 'public' })
export class District extends AbstractEntityIntId<District> {
  @Column({ type: 'varchar', length: 2000, nullable: true })
  district_name: string;

  @ManyToMany(
    () => ReigsterTutorEntity,
    (reigster_tutor) => reigster_tutor.district,
  )
  register_tutor: District[];

  static async findByName(name: string[]) {
    return this.createQueryBuilder('district')
      .where('district.district_name IN (:...name)', { name })
      .getMany();
  }
}
