import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common/databases/abstracts/abstract.repository';
import { ReigsterTutorEntity } from 'src/common/databases/datasource/entities/user-advance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TutorRepository extends AbstractRepository<ReigsterTutorEntity> {
  constructor(
    @InjectRepository(ReigsterTutorEntity)
    private readonly tutorRepository: Repository<ReigsterTutorEntity>,
  ) {
    super(tutorRepository);
  }
}
