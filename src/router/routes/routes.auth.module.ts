import { Module } from '@nestjs/common';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { AuthModule } from 'src/modules/auth/auth.module';
import { AuthController } from 'src/modules/auth/controller/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [DebuggerService],
  imports: [AuthModule],
})
export class RoutesAuthModule {}
