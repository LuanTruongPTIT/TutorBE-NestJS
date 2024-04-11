import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/databases/abstracts/abstract.repository';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
