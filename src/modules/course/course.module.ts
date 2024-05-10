import { Module } from '@nestjs/common';
import { CourseService } from './services/courses.service';

@Module({
  imports: [],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
