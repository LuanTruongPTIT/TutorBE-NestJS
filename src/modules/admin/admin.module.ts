import { Module } from '@nestjs/common';
import { AdminService } from './services/admin.service';
import { AuthService } from '../auth/services/auth.service';
import { AuthRepositoryModule } from '../auth/repository/auth.repository.module';

@Module({
  imports: [AuthRepositoryModule],
  controllers: [],
  providers: [AdminService, AuthService],
  exports: [AdminService, AuthService],
})
export class AdminModule {}
