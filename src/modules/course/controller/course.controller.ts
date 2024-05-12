import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CourseService } from '../services/courses.service';
import { ChapterCreateDto, CourseCreateDto } from '../dto/course-create.dto';
import { AuthJwtTutorAccessProtected } from '../decorators/course.decorator';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { CourseUpdateCourseDto } from '../dto/course.update-course.dto';
import { CourseUpdateReorderChapterDto } from '../dto/course.update-reorder-chapter';

@Controller('')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private debugService: DebuggerService,
  ) {}

  @AuthJwtTutorAccessProtected()
  @Post('/create-course')
  async CreateCourse(@Body() data: CourseCreateDto, @Req() req, @Res() res) {
    this.debugService.info(data);
    const user_id = req['user'].id;

    const result = await this.courseService.createCourse(user_id, data);
    if (!result) {
      return res
        .status(400)
        .json({ message: 'Create course failed', status: 400 });
    }
    return res.status(200).json({
      data: {
        message: 'Create course success',
        id: 1,
      },
      status: 200,
    });
  }
  @AuthJwtTutorAccessProtected()
  @Get('/get-course/:id')
  async GetCourseUserById(@Param('id') id: number, @Req() req, @Res() res) {
    const user_id = req['user'].id;

    const course = await this.courseService.getCourseById(user_id, Number(id));
    if (!course) {
      return res.status(400).json({ message: 'Course not found', status: 400 });
    }
    return res.status(200).json({
      data: {
        message: 'Get course success',
        course: course,
      },
      status: 200,
    });
  }

  @AuthJwtTutorAccessProtected()
  @Put('/update-course/:id')
  async UpdateCourse(
    @Param('id') id: number,
    @Body() data: CourseUpdateCourseDto,
    @Req() req,
    @Res() res,
  ) {
    const user_id = Number(req['user'].id);
    const result = await this.courseService.updateCourse(
      user_id,
      Number(id),
      data,
    );
    if (!result) {
      return res
        .status(400)
        .json({ message: 'Update course failed', status: 400 });
    }
    return res.status(200).json({
      data: {
        message: 'Update course success',
        course: result,
      },
      status: 200,
    });
  }
  @AuthJwtTutorAccessProtected()
  @Post('/:id/create-chapter')
  async CreateChapter(
    @Param('id') id: number,
    @Body() data: ChapterCreateDto,
    @Req() req,
    @Res() res,
  ) {
    const user_id = req['user'].id;
    const result = await this.courseService.createChapter(
      user_id,
      Number(id),
      data,
    );
    if (!result) {
      return res
        .status(400)
        .json({ message: 'Create chapter failed', status: 400 });
    }
    return res.status(200).json({
      data: {
        message: 'Create chapter success',
        course: result,
      },
      status: 200,
    });
  }

  @AuthJwtTutorAccessProtected()
  @Put('/:id/chapters/reorder')
  async UpdateChapterReorder(
    @Param('id') id: number,
    @Body() data: CourseUpdateReorderChapterDto[],
    @Req() req,
    @Res() res,
  ) {
    const user_id = req['user'].id;
    const result = await this.courseService.updateReorderChapter(
      user_id,
      Number(id),
      data,
    );
    if (!result) {
      return res
        .status(400)
        .json({ message: 'Update reorder chapter failed', status: 400 });
    }
    return res.status(200).json({
      data: {
        message: 'Update reorder chapter success',
        course: result,
      },
      status: 200,
    });
  }
  @AuthJwtTutorAccessProtected()
  @Get('/get-all-courses')
  async GetAllCourse(@Req() req, @Res() res) {
    const user_id = req['user'].id;
    const result = await this.courseService.getAllCourseOfUser(user_id);
    return res.status(200).json({
      data: {
        message: 'Get all course success',
        course: result,
      },
      status: 200,
    });
  }
}
