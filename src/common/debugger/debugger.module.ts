import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { DebuggerOptionService } from './services/debuger.option.service';
import { DebuggerOptionsModule } from './debugger.options.module';

@Module({
  providers: [DebuggerService],
  exports: [DebuggerService],
  controllers: [],
  imports: [
    WinstonModule.forRootAsync({
      inject: [DebuggerOptionService],
      imports: [DebuggerOptionsModule],
      useFactory: (debuggerOptionsService: DebuggerOptionService) =>
        debuggerOptionsService.createLogger(),
    }),
  ],
})
export class DebuggerModule {}
