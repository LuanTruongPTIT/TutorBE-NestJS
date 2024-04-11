import { Module } from '@nestjs/common';
import { EmailModule } from 'src/common/email/mail.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { RoleModule } from 'src/modules/role/role.module';
import { UserPublicController } from 'src/modules/user/controller/user.public.controller';

import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [UserPublicController],
  providers: [],
  imports: [UserModule, RoleModule, AuthModule, EmailModule],
})
export class RoutesUserModule {}
