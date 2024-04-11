import { Module } from '@nestjs/common';
import { DebuggerOptionService } from './services/debuger.option.service';

@Module({
  providers: [DebuggerOptionService],
  exports: [DebuggerOptionService],
  imports: [],
})
export class DebuggerOptionsModule {}
