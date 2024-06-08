import { Module } from '@nestjs/common';
import { AdminModule } from 'src/modules/admin/admin.module';
import { AdminController } from 'src/modules/admin/controller/admin.controller';

@Module({
  controllers: [AdminController],
  providers: [],
  imports: [AdminModule],
  exports: [],
})
export class RoutesAdminModule {}
