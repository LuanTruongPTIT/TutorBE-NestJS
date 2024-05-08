import { Module } from '@nestjs/common';
import { TutorRepositoryModule } from './repository/tutor.repository.module';
import { TutorService } from './service/tutor.service';
import { UserRepositoryModule } from '../user/repository/user.repository.module';
import { AuthModule } from '../auth/auth.module';
import { TutorGateway } from './controller/tutor.socket';

@Module({
  imports: [TutorRepositoryModule, UserRepositoryModule, AuthModule],
  controllers: [],
  providers: [TutorService, TutorGateway],
  exports: [TutorService],
})
export class TutorModule {}
