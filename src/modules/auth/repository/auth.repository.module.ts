import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { Auth } from 'src/common/databases/datasource/entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [AuthRepository],
  exports: [AuthRepository],
})
export class AuthRepositoryModule {}
