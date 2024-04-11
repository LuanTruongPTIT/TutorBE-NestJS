import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthRepositoryModule } from './repository/auth.repository.module';
import { HelperModule } from 'src/common/helper/helper.module';
import { UserService } from '../user/services/user.service';
import { EmailService } from 'src/common/email/email.service';
import { UserRepositoryModule } from '../user/repository/user.repository.module';

@Module({
  imports: [AuthRepositoryModule, HelperModule, UserRepositoryModule],
  providers: [AuthService, UserService, EmailService],
  exports: [AuthService, UserService, EmailService],
})
export class AuthModule {}
