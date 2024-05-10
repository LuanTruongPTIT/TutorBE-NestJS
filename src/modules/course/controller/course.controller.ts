import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CourseService } from '../services/courses.service';
import { CourseCreateDto } from '../dto/course-create.dto';
import { AuthJwtTutorAccessProtected } from '../decorators/course.decorator';

@Controller('')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @AuthJwtTutorAccessProtected()
  @Post('/create-course')
  async createCourse(@Body() data: CourseCreateDto, @Req() req, @Res() res) {
    console.log('create course', data);
    return res
      .status(200)
      .json({ message: 'Create course success', status: 200 });
  }
}
