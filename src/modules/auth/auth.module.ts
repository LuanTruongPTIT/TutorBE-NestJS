import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthRepositoryModule } from './repository/auth.repository.module';
import { HelperModule } from 'src/common/helper/helper.module';
import { UserService } from '../user/services/user.service';
import { EmailService } from 'src/common/email/email.service';
import { UserRepositoryModule } from '../user/repository/user.repository.module';
import { RoleService } from '../role/service/role.service';
import { RoleRepositoryModule } from '../role/repository/role.repository.module';
import { PassportModule } from '@nestjs/passport';
import { AuthJwtAccessStrategy } from './guards/auth.jwt-access.guard';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';

@Module({
  imports: [
    AuthRepositoryModule,
    HelperModule,
    UserRepositoryModule,
    RoleRepositoryModule,
    PassportModule,
  ],
  providers: [
    AuthService,
    UserService,
    EmailService,
    RoleService,
    AuthJwtAccessStrategy,
    DebuggerService,
    // AuthJwtRefreshStrategy,
  ],
  exports: [
    AuthService,
    UserService,
    EmailService,
    RoleService,
    AuthJwtAccessStrategy,
  ],
})
export class AuthModule {}
