import { Module } from '@nestjs/common';
import { CourseService } from './services/courses.service';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';

@Module({
  imports: [],
  providers: [CourseService, DebuggerService],
  exports: [CourseService, DebuggerService],
})
export class CourseModule {}
