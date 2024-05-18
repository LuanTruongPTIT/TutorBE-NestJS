import { HttpException, Injectable, Res } from '@nestjs/common';
import { TutorRepository } from '../repository/tutor.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { BecomeTutorDto } from '../dto/tutor.register-tutor.dto';
import {
  ApplicationStatus,
  ReigsterTutorEntity,
} from 'src/common/databases/datasource/entities/user-advance.entity';
import { SubjectEntity } from 'src/common/databases/datasource/entities/subject.entity';
import { ImageEntity } from 'src/common/databases/datasource/entities/image.entity';
import {
  TutorApplicationInterview,
  TutorApplicationSerialization,
} from '../serialization/tutor.get-application.serialization';
import { TutorGetApplicationDetailSerialization } from '../serialization/tutor.get-application-detail.serialization';
import { AddStudentDto } from '../dto/tutor.add-student';
import { Course } from 'src/common/databases/datasource/entities/course.entity';
import { ClassEntity } from 'src/common/databases/datasource/entities/class.entity';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { TutorGetAllStudentsOfTutorSerialization } from '../serialization/tutor.get-all-students-of-tutor.serialization';
import { Auth } from 'src/common/databases/datasource/entities/auth.entity';
import { SearchStudentResponse } from '../serialization/tutor.search-student.response';
import { StudentAdvanceEntity } from 'src/common/databases/datasource/entities/student-advance.entity';

@Injectable()
export class TutorService {
  constructor(
    private readonly tutorRepository: TutorRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async becomeTutor(data: BecomeTutorDto, user_id: number) {
    const {
      degree,
      degree_type,
      specializations,
      bio,
      universityName,
      subject,
      salary,
      startDate,
      endDate,
    } = data;
    console.log(data);
    const user = await this.userRepository.findOne({ id: user_id });
    if (!user) {
      throw new Error('User not found');
    }
    const tutorRegis = new ReigsterTutorEntity();
    if (subject) {
      tutorRegis.subject = await SubjectEntity.findByName(subject);
    }

    if (data.imgUrl) {
      const image = new ImageEntity();
      image.image_url = data.imgUrl;
      const images = await ImageEntity.save(image);
      tutorRegis.image = [images];
    }

    tutorRegis.college = universityName;
    tutorRegis.degree = degree;
    tutorRegis.degree_type = degree_type;
    tutorRegis.specializations = specializations;
    tutorRegis.bio = bio;
    tutorRegis.salary = Number(salary);
    user.firstName = data.first_name;
    user.lastName = data.last_name;
    tutorRegis.start_date_study_year = startDate;
    tutorRegis.end_date_study_year = endDate;
    tutorRegis.is_age_18 = data.isAge18 ? 1 : 0;
    tutorRegis.user = user;

    await this.tutorRepository.save(tutorRegis);
    return true;
  }

  async findUserById(user_id: number) {
    return this.userRepository.findOne({ id: user_id });
  }
  async checkUserRegisterTutor(user_id: number) {
    return ReigsterTutorEntity.findOne({ where: { user: { id: user_id } } });
  }

  async getApplicationTutor() {
    const datas = await ReigsterTutorEntity.getApplicationTutor();
    const result = TutorApplicationSerialization.fromPlain(datas);
    return result;
  }

  async getApplicationTutorById(id: number) {
    const datas = await ReigsterTutorEntity.getApplicationTutorDetailById(id);
    return TutorGetApplicationDetailSerialization.fromPlain(datas);
  }
  async updateStatusApplicationTutor(id: number, status: ApplicationStatus) {
    await ReigsterTutorEntity.updateStatus(id, status);
    const data = await ReigsterTutorEntity.getApplicationTutorById(id);
    data.position = 'Application for tutor';
    return TutorApplicationSerialization.fromPlainDetail(data);
  }

  async getApplicationTutorReview() {
    const datas = await ReigsterTutorEntity.getApplicationTutorReview();
    const result = TutorApplicationSerialization.fromPlain(datas);
    return result;
  }

  async getAllAplicationTutorInterview() {
    const datas = await ReigsterTutorEntity.getAllAplicationTutorInterview();
    console.log(datas);
    return TutorApplicationInterview.fromPlain(datas);
  }

  // async CreateStudent(data: TutorCreateSutdentDto) {
  //   const { email } = data;
  //   const checkStudent = await User.findUserByEmail(email);
  //   if (checkStudent) {
  //     throw new Error('Student is already exist');
  //   }
  //   if (!checkStudent.auth.email_verify) {
  //     throw new Error('Account Student is not verify');
  //   }
  //   const checkStudentIsRegisterByYou = await
  //   const studentAdvance = new StudentAdvanceEntity();
  //   studentAdvance.lastName = data.lastName;
  //   studentAdvance.firstName = data.firstName;
  //   studentAdvance.country = data.country;
  //   studentAdvance.address = data.address;
  //   studentAdvance.phoneNumber = data.phone;
  //   studentAdvance.gender = data.gender;
  //   studentAdvance.user = checkStudent;
  // }

  async SearchStudentAdvance(email: string) {
    // const student = await StudentAdvanceEntity.findStudentByEmai(email);
    // return student;
    // const role_student = await Role.findRoleByRoleName('student');
    // if (!role_student) {
    //   throw new Error('Role student not found');
    // }
    const student = await Auth.findByEmailAndRole(email, 'student');
    return SearchStudentResponse.fromPlain(student);
  }

  async AddStudent(@Res() res, tutor_id: number, data: AddStudentDto) {
    const { course_name, date, email, isSelect, class_name } = data;
    const checkStudent = await User.findUserByEmail(email);
    if (!checkStudent) {
      throw new HttpException('Student not found', 404);
    }
    console.log(checkStudent);
    const checkStudentAdvance =
      await StudentAdvanceEntity.findStudentByStudentId(
        Number(checkStudent.id),
      );
    if (!checkStudentAdvance) {
      throw new Error('Profile of student is not found');
    }
    const checkClass = await ClassEntity.findClassById(class_name, tutor_id);

    if (isSelect) {
      if (!checkClass) {
        throw new Error('Class is not found');
      }
      const checkSutdentIshJoinClass = await ClassEntity.findStudentJoinInClass(
        checkClass.id,
        tutor_id,
        checkStudentAdvance.id,
      );
      console.log('checkSutdentIshJoinClass', checkSutdentIshJoinClass);
      if (checkSutdentIshJoinClass) {
        throw new HttpException('Student is already join in class', 400);
      }
      checkStudentAdvance.Class = [checkClass];
      await StudentAdvanceEntity.save(checkStudentAdvance);
    } else {
      const checkClassName = await ClassEntity.findClassByNames(class_name);
      if (checkClassName) {
        throw new HttpException('Class is Exist', 400);
      }
      const course = await Course.findCourseByName(course_name, tutor_id);
      if (!course) {
        throw new Error('Course is not found');
      }
      const tutor = await User.findUserById(tutor_id);
      const room = new ClassEntity();
      room.tutor = tutor;
      room.student = [checkStudentAdvance];
      room.name = class_name;
      room.startDate = date.from;
      room.endDate = date.to;
      room.course = course;
      await ClassEntity.create(room).save();
    }
  }

  async GetAllStudentByTutorId(tutor_id: number) {
    const data = await ClassEntity.findStudentdentByTutorId(tutor_id);

    const students = await Promise.all(
      data.map((item) => {
        return item.student;
      }),
    );
    const response =
      TutorGetAllStudentsOfTutorSerialization.fromPlain(students).flat();
    console.log(response.length);
    const map = new Map();
    const result = [];
    for (const item of response) {
      if (!map.has(item.id)) {
        map.set(item.id, true);
        result.push(item);
      }
    }
    return result;
  }
  async GetAllStudentByCourseEnroll(tutor_id: number, course_id: number) {
    const data = await ClassEntity.findAllStudentEnrollByCourseId(
      tutor_id,
      course_id,
    );

    return Promise.all(
      data.map(async (item) => {
        return item.student;
      }),
    );
  }

  async GetAllClassByTutorId(tutor_id: number) {
    const data = await ClassEntity.findAllClassByTutor(tutor_id);
    return data;
  }
}
