import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/databases/abstracts/abstract.repository';
import { Auth } from 'src/common/databases/datasource/entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository extends AbstractRepository<Auth> {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {
    super(authRepository);
  }
}
