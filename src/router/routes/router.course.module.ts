import { Module } from '@nestjs/common';
import { CourseController } from 'src/modules/course/controller/course.controller';
import { CourseModule } from 'src/modules/course/course.module';

@Module({
  controllers: [CourseController],
  providers: [],
  imports: [CourseModule],
  exports: [],
})
export class RoutesCourseModule {}
