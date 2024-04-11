import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { Role } from 'src/common/databases/datasource/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleRepository],
  exports: [RoleRepository],
})
export class RoleRepositoryModule {}
