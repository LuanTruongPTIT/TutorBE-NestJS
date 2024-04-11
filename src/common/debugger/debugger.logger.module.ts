import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DebuggerInterceptor } from 'src/common/debugger/interceptors/debugger.logger.interceptor';
import { DebuggerModule } from './debugger.module';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DebuggerInterceptor,
    },
  ],
  exports: [],
  controllers: [],
  imports: [DebuggerModule],
})
export class DebuggerLoggerModule {}
