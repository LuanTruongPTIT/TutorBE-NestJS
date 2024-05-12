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
import { BecomeTutorDto } from '../dto/register-tutor.dto';
import {
  AuthJwtAccessProtected,
  AuthJwtAdminAccessProtected,
  UserProtected,
} from 'src/modules/auth/decorators/auth.jwt.decorator';
import { TutorService } from '../service/tutor.service';
import { Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TutorUpdateStatusDto } from '../dto/tutor.update-status.dto';

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
}
