import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { BecomeTutorDto } from '../dto/tutor.register-tutor.dto';
import {
  AuthJwtAccessProtected,
  AuthJwtAdminAccessProtected,
  UserProtected,
} from 'src/modules/auth/decorators/auth.jwt.decorator';
import { TutorService } from '../service/tutor.service';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TutorUpdateStatusDto } from '../dto/tutor.update-status.dto';
import { AuthJwtAdminAndTutorAccessProtected } from '../decorators/tutor.decorator';
import { TutorCreateSutdentDto } from '../dto/tutor.create-student-advance';
import { AddStudentDto } from '../dto/tutor.add-student';

@Controller()
export class TutorController {
  constructor(
    private readonly tutorService: TutorService,
    private eventEmitter: EventEmitter2,
  ) {}

  @UserProtected()
  @AuthJwtAccessProtected()
  @Post('/register-tutor')
  async registerTutor(
    @Body() data: BecomeTutorDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user_id = req['user'].id;
    console.log('register tutor', data);
    const checkUserRegister =
      await this.tutorService.checkUserRegisterTutor(user_id);
    console.log(checkUserRegister);
    if (checkUserRegister) {
      return res
        .status(422)
        .json({ message: 'You already registered tutor', status: 422 });
    }

    await this.tutorService.becomeTutor(data, req['user'].id);
    return res
      .status(200)
      .json({ message: 'Register tutor success', status: 200 });
  }

  /**
   * Retrieves all students.
   *
   * @return {Promise<any>} All students.
   */
  @Get('/get-all-students')
  async getAllStudents(): Promise<any> {}

  // @PolicyAbilityProtected({
  //   subject: ENUM_POLICY_SUBJECT.TUTOR,
  //   action: [ENUM_POLICY_ACTION.READ],
  // })
  @AuthJwtAdminAccessProtected()
  @Get('/get-all-application')
  async getAllApplication(@Res() res: Response): Promise<any> {
    console.log('get all application');
    const data = await this.tutorService.getApplicationTutor();
    return res.status(200).json(data);
  }

  @Post('/test')
  async test() {
    const userId = 3;
    this.eventEmitter.emit('notificationAcceptedForm', {
      message:
        'Thank you for your registration. We will review your application and get back to you soon.',
      userId: userId.toString(),
    });
  }

  @AuthJwtAdminAccessProtected()
  @Get('/get-detail-application/:id')
  async getDetailRegisterApplication(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const data = await this.tutorService.getApplicationTutorById(id);
    return res.status(200).json(data);
  }

  @Put('/update-status-application')
  async updateStatusApplication(
    @Res() res: Response,
    @Req() req: Request,
    @Body() data: TutorUpdateStatusDto,
  ) {
    const { status, id } = data;
    const result = await this.tutorService.updateStatusApplicationTutor(
      id,
      status,
    );
    return res.status(200).json(result);
  }

  @AuthJwtAdminAccessProtected()
  @Get('/get-all-application-review')
  async getApplicationTutorReview(@Res() res: Response) {
    const data = await this.tutorService.getApplicationTutorReview();
    return res.status(200).json(data);
  }

  @AuthJwtAdminAccessProtected()
  @Get('/get-all-application-interview')
  async getApplicationTutorInterview(@Res() res: Response) {
    const data = await this.tutorService.getAllAplicationTutorInterview();
    return res.status(200).json(data);
  }
  @AuthJwtAdminAndTutorAccessProtected()
  @Post('/create-student')
  async CreateStudent(
    @Body() data: TutorCreateSutdentDto,
    @Res() res: Response,
  ) {
    console.log('create student', data);
    res.status(200).json({ message: 'Create student success' });
  }

  @AuthJwtAdminAndTutorAccessProtected()
  @Get('/search-student/:email')
  async SearchStudent(@Param('email') data: string, @Res() res: Response) {
    console.log('search student', data);
    const student = await this.tutorService.SearchStudentAdvance(data);
    if (!student) {
      return res
        .status(404)
        .json({ payload: { message: 'Student is not found!' }, status: 404 });
    }
    return res.status(200).json({
      data: {
        message: 'Get student success!',
        student: student,
      },
      status: 200,
    });
  }

  @AuthJwtAdminAndTutorAccessProtected()
  @Post('/add-student')
  async AddStudentToTutor(
    @Body() data: AddStudentDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user_id = req['user'].id;
    try {
      await this.tutorService.AddStudent(res, user_id, data);
      return res.status(200).json({
        data: { message: 'Add student to tutor success' },
        status: 200,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.getStatus() === 400) {
          return res.status(400).json({
            payload: { message: error.message },
            status: 400,
          });
        } else if (error.getStatus() === 404) {
          return res.status(404).json({
            payload: { message: error.message },
            status: 404,
          });
        }
      }
      console.log(error);
    }
  }

  @AuthJwtAdminAndTutorAccessProtected()
  @Get('/get-all-student')
  async GetAllStudent(@Res() res: Response, @Req() req: Request) {
    const user_id = req['user'].id;
    const students = await this.tutorService.GetAllStudentByTutorId(
      Number(user_id),
    );
    return res.status(200).json({
      data: {
        message: 'Get all student success',
        students: students,
      },
      status: 200,
    });
  }
  @AuthJwtAdminAndTutorAccessProtected()
  @Get('/get-all-student-by-course-enroll/:course_id')
  async GetAllSutdentByCourseEnroll(
    @Param('course_id') course_id: any,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user_id = req['user'].id;
    console.log('get all student by course enroll', course_id, user_id);
    const data = await this.tutorService.GetAllStudentByCourseEnroll(
      Number(user_id),
      Number(course_id),
    );
    console.log(data);
    if (!data) {
      return res
        .status(404)
        .json({ message: 'Student not found', status: 404 });
    }
    return res.status(200).json({
      data: {
        message: 'Get all student by course enroll success',
        students: data,
      },
      status: 200,
    });
  }
  @AuthJwtAdminAndTutorAccessProtected()
  @Get('/get-all-class-by-tutor')
  async GetAllClassByTutor(@Res() res: Response, @Req() req: Request) {
    const user_id = req['user'].id;
    const data = await this.tutorService.GetAllClassByTutorId(Number(user_id));
    if (!data) {
      return res.status(404).json({ message: 'Class not found', status: 404 });
    }
    return res.status(200).json({
      data: {
        message: 'Get all class by tutor success',
        class: data,
      },
      status: 200,
    });
  }
}
