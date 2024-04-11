import { Module } from '@nestjs/common';
import { UserRepositoryModule } from './repository/user.repository.module';
import { UserService } from 'src/modules/user/services/user.service';
import { AuthRepositoryModule } from '../auth/repository/auth.repository.module';
import { EmailModule } from 'src/common/email/mail.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UserRepositoryModule,
    AuthRepositoryModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
