import { Module } from '@nestjs/common';
import { RoleRepositoryModule } from './repository/role.repository.module';
import { RoleService } from './service/role.service';

@Module({
  imports: [RoleRepositoryModule],
  controllers: [],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
