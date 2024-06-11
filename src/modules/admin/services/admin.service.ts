import {
  Gender,
  StudentAdvanceEntity,
} from 'src/common/databases/datasource/entities/student-advance.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { AdminGetAllUserSerialization } from '../serialization/admin.get-all-user.serialization';
import { PageOptionsDto } from 'src/common/pagination/dto/page.options.dto';
import { TutorAdvanceEntity } from 'src/common/databases/datasource/entities/tutor-advance.entity';
import { AdminGetAllTutorSerialization } from '../serialization/admin.get-all-tutor.serialization';
import { AdminGetTutorDetailSerialization } from '../serialization/admin.get-tutor.detail.serialization';
import { AdminCreateTutorDto } from '../dto/admin.create-tutor.dto';
import { Auth } from 'src/common/databases/datasource/entities/auth.entity';
import { Role } from 'src/common/databases/datasource/entities/role.entity';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { ScheduleEntity } from 'src/common/databases/datasource/entities/schedule.entity';
import { AdminGetAllStudentSerialization } from '../serialization/admin.get-all-student.serialization';
import { AdminCreateStudentDto } from '../dto/admin.create-student.dto';
import datasource from 'src/common/databases/datasource';
import { Course } from 'src/common/databases/datasource/entities/course.entity';

@Injectable()
export class AdminService {
  constructor(private readonly authService: AuthService) {}
  async GetAllUser(pageOptionsDto: PageOptionsDto) {
    const data = await User.GetAllUserByAdmin(pageOptionsDto);
    return AdminGetAllUserSerialization.fromPlainArray(data);
  }
  async GetAllTutor(pageOptionsDto: PageOptionsDto) {
    const data = await TutorAdvanceEntity.findAllTutors(pageOptionsDto);
    return AdminGetAllTutorSerialization.fromPlainArray(data);
  }

  async GettTutorDetailById(id: number) {
    const data = await User.findTutorDetailById(id);
    // return data;
    return AdminGetTutorDetailSerialization.fromPlain(data);
  }

  async CreateTutor(data: AdminCreateTutorDto) {
    console.log('data', data);
    const { email } = data;
    const checkUser = await Auth.findOne({
      where: { email },
      relations: ['user'],
    });
    const checkPhoneNumber = await StudentAdvanceEntity.findOne({
      where: { phoneNumber: data.phone_number },
    });
    if (checkPhoneNumber) {
      throw new HttpException('Phone number already exists', 422);
    }
    if (checkUser) {
      throw new HttpException('Email already exists', 422);
    }

    const role = await Role.findOne({ where: { role_name: 'tutor' } });
    const auth = new Auth();
    auth.email = email;
    auth.password = (
      await this.authService.createPassword(data.password)
    ).passwordHash;
    auth.role = [role];
    const authCreate = await auth.save();
    const user = new User();
    user.email = email;
    user.auth = authCreate;
    auth.email_verify = true;
    const userCreate = await user.save();
    const tutor = new TutorAdvanceEntity();
    tutor.user = userCreate;
    tutor.first_name = data.first_name;
    tutor.last_name = data.last_name;
    tutor.address = data.address;
    tutor.phone_number = data.phone_number;
    tutor.city = data.city;
    tutor.country = data.country;
    tutor.imagePhoto = data.urls;
    await tutor.save();
  }

  async GeAllStudent() {
    const data = await StudentAdvanceEntity.findAllStudent();
    return AdminGetAllStudentSerialization.fromPlainArray(data);
  }
  async GetAllSchedule() {
    return await ScheduleEntity.findAllScheduleByAdmin();
  }

  async CreateStudent(data: AdminCreateStudentDto) {
    const checkEmail = await User.findOne({ where: { email: data.email } });
    if (checkEmail) {
      throw new HttpException('Email already exists', 422);
    }
    const checkPhone = await StudentAdvanceEntity.findOne({
      where: { phoneNumber: data.phone_number },
    });
    if (checkPhone) {
      throw new HttpException('Phone number already exists', 422);
    }

    const auth = new Auth();
    auth.email = data.email;
    auth.password = (
      await this.authService.createPassword(data.password)
    ).passwordHash;
    auth.role = [await Role.findOne({ where: { role_name: 'student' } })];
    const authCreate = await auth.save();
    const user = new User();
    user.email = data.email;
    user.auth = authCreate;
    auth.email_verify = true;
    const userCreate = await user.save();
    console.log('userCreate', userCreate);
    const student = new StudentAdvanceEntity();
    student.user = userCreate;
    student.firstName = data.firstName;
    student.lastName = data.lastName;
    student.gender = data.gender as Gender;
    student.parent_name = data.parent_name;
    student.school = data.name_school;
    student.dateOfBirth = data.date_of_birth;
    student.address = data.address;
    student.phoneNumber = data.phone_number;
    student.country = data.country;
    student.imageUrl = data.urls;
    student.level = data.level;
    await StudentAdvanceEntity.create(student).save();
  }

  async GetAllCourses() {
    return await Course.GetAllCourse();
  }
}
