import { Module } from '@nestjs/common';
import { TutorRepository } from './tutor.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReigsterTutorEntity } from 'src/common/databases/datasource/entities/user-advance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReigsterTutorEntity])],
  controllers: [],
  providers: [TutorRepository],
  exports: [TutorRepository],
})
export class TutorRepositoryModule {}
