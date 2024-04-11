import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/databases/abstracts/abstract.repository';
import { Role } from 'src/common/databases/datasource/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends AbstractRepository<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly userRepository: Repository<Role>,
  ) {
    super(userRepository);
  }
}
