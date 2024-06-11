import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { AuthJwtAdminAccessProtected } from 'src/modules/auth/decorators/auth.jwt.decorator';
import { Response } from 'express';
import { PageOptionsDto } from 'src/common/pagination/dto/page.options.dto';
import { AdminCreateTutorDto } from '../dto/admin.create-tutor.dto';
import { AdminCreateStudentDto } from '../dto/admin.create-student.dto';
@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @AuthJwtAdminAccessProtected()
  @Get('/get-all-user')
  async GetAllUser(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() res: Response,
  ) {
    const data = await this.adminService.GetAllUser(pageOptionsDto);
    return res.status(200).json({
      data: {
        message: 'Get all user success',
        user: data,
      },
      status: 200,
    });
  }

  @AuthJwtAdminAccessProtected()
  @Get('/get-all-tutor')
  async GetAllTutor(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() res: Response,
  ) {
    const data = await this.adminService.GetAllTutor(pageOptionsDto);
    return res.status(200).json({
      data: {
        message: 'Get all tutor success',
        tutor: data,
      },
      status: 200,
    });
  }

  @AuthJwtAdminAccessProtected()
  @Get('/get-tutor-detail/:id')
  async GetTutorDetail(@Param('id') id: number, @Res() res: Response) {
    const tutor_id = id;
    const data = await this.adminService.GettTutorDetailById(tutor_id);
    return res.status(200).json({
      data: {
        message: 'Get all tutor success',
        tutor: data,
      },
      status: 200,
    });
  }
  @AuthJwtAdminAccessProtected()
  @Post('/create-tutor-by-admin')
  async CreateTutor(@Body() data: AdminCreateTutorDto, @Res() res: Response) {
    try {
      await this.adminService.CreateTutor(data);
      return res.status(200).json({
        data: {
          message: 'Create tutor success',
        },
        status: 200,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.getStatus() === 422) {
          return res.status(422).json({
            payload: { message: error.message },
            status: 400,
          });
        }
      }
    }
  }
  @AuthJwtAdminAccessProtected()
  @Get('/get-all-student')
  async GeAllStudent(@Res() res: Response) {
    const data = await this.adminService.GeAllStudent();
    return res.status(200).json({
      data: {
        message: 'Get all student success',
        student: data,
      },
      status: 200,
    });
  }

  @AuthJwtAdminAccessProtected()
  @Get('/get-all-schedule')
  async GeAllSchedule(@Res() res: Response) {
    const data = await this.adminService.GetAllSchedule();
    return res.status(200).json({
      data: {
        message: 'Get all schedule success',
        schedule: data,
      },
      status: 200,
    });
  }

  @AuthJwtAdminAccessProtected()
  @Get('/create-student-by-admin')
  async CreateStudent(
    @Body() data: AdminCreateStudentDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.adminService.CreateStudent(data);
      return res.status(200).json({
        data: {
          message: 'Create student success',
          student: result,
        },
        status: 200,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.getStatus() === 422) {
          return res.status(422).json({
            payload: { message: error.message },
            status: 400,
          });
        }
      }
    }
  }
}
