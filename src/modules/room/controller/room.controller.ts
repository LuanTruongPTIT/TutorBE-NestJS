import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { AuthJwtAdminAndTutorAccessProtected } from 'src/modules/tutor/decorators/tutor.decorator';
import { RoomService } from '../services/room.service';
import { Response } from 'express';
@Controller('')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @AuthJwtAdminAndTutorAccessProtected()
  @Get('/get-course-by-class/:classId')
  async GetCourseByClassOfTutor(
    @Param('classId') classId: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user_id = req['user'].id;
    const data = await this.roomService.GetCourseByClassOfTutor(
      Number(classId),
      Number(user_id),
    );
    if (!data) {
      return res.status(400).json({ message: 'Course not found', status: 400 });
    }
    return res.status(200).json({
      data: {
        message: 'Get course success',
        course: data,
      },
      status: 200,
    });
  }
  // @AuthJwtAdminAndTutorAccessProtected()
  @Get('/get-all-chapter-not-complete-by-class/:classId')
  async GetAllChapterNotCompleteByClassId(
    @Param('classId') classId: number,
    @Param('course_id') course_id: number,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    // const user_id = req['user'].id;
    const data = await this.roomService.GetAllChapterNotCompleteByClassId(
      Number(classId),
    );
    if (!data) {
      return res
        .status(400)
        .json({ message: 'Chapter not found', status: 400 });
    }
    return res.status(200).json({
      data: {
        message: 'Get all chapter not complete success',
        chapters: data,
      },
      status: 200,
    });
  }
}
