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
import { CreateScheduleDto } from '../dto/tutor.create-schedule';
import { Chapter } from 'src/common/databases/datasource/entities/chapter.entity';
import { LessonEntity } from 'src/common/databases/datasource/entities/lesson.entity';
import {
  ScheduleEntity,
  scheduleStatus,
} from 'src/common/databases/datasource/entities/schedule.entity';
import { TutorGetAllScheduleSerialization } from '../serialization/tutor.get-all-schedule.serialization';
import {
  AttendanceEntity,
  status_attendance,
} from 'src/common/databases/datasource/entities/attendance.entity';
import { TutorAttendanceStudentSerialization } from '../serialization/tutor.attendance-student.serialization';
import { TutorMarkPresentDto } from '../dto/tutor.mark-present.dto';
import { TutorAdvanceEntity } from 'src/common/databases/datasource/entities/tutor-advance.entity';
import { TutorGetProfileSerialization } from '../serialization/tutor.get-profile.serialization';

@Injectable()
export class TutorService {
  constructor(
    private readonly tutorRepository: TutorRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async becomeTutor(data: BecomeTutorDto, user_id: number) {
    const {
      degree,
      degreeType,
      specialization,
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
    const subjectArray: SubjectEntity[] = [];
    if (subject) {
      Promise.all(
        subject.map(async (item) => {
          const subject = await SubjectEntity.findAllByName(item);
          subjectArray.push(subject);
        }),
      );
      tutorRegis.subject = subjectArray;
    }

    if (data.imgUrl) {
      const image = new ImageEntity();
      image.image_url = data.imgUrl;
      const images = await ImageEntity.save(image);
      tutorRegis.image = [images];
    }
    tutorRegis.college = universityName;
    tutorRegis.degree = degree;
    tutorRegis.degree_type = degreeType;
    tutorRegis.specializations = specialization;
    tutorRegis.bio = bio;
    tutorRegis.salary = Number(salary);
    user.firstName = data.firstName;
    user.lastName = data.lastName;
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
    const checkClass = await ClassEntity.findClassByName(class_name, tutor_id);

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

  async CreateSchedule(tutor_id: number, data: CreateScheduleDto) {
    const { course, chapter, room, date_schedule, duration_time } = data;
    const startDate = new Date(date_schedule);
    const day = startDate.getUTCDate() + 1;
    const month = startDate.getUTCMonth();
    const year = startDate.getUTCFullYear();

    const checkDate = new Date(year, month, day).toISOString().split('T')[0];

    const checkSchedule = await ScheduleEntity.findAllScheduleByDate(
      checkDate,
      tutor_id,
    );
    console.log('checkSchedule', checkSchedule);
    if (checkSchedule.length > 0) {
      checkSchedule.forEach((item) => {
        if (item.Class.id === room) {
          throw new HttpException(
            `Class ${item.Class.name} is scheduled for ${new Date(date_schedule).toISOString().split('T')[0]}!`,
            400,
          );
        }
      });
    }
    await Promise.all(
      checkSchedule.map(async (item) => {
        if (
          startDate.getTime() >= item.start_date.getTime() &&
          startDate.getTime() <= item.duration_time.getTime()
        ) {
          console.log(
            startDate.getTime(),
            item.start_date.getTime(),
            item.duration_time.getTime(),
          );
          throw new HttpException(
            'You have a schedule for this period of time',
            400,
          );
        } else if (
          startDate.getTime() <= item.start_date.getTime() &&
          item.start_date.getTime() <= startDate.getTime()
        ) {
          throw new HttpException(
            'You have a schedule for this period of time',
            400,
          );
        }
      }),
    );
    const chapterCreate = await Chapter.findChapterById(chapter, course);
    const roomClass = await ClassEntity.findClassById(room, tutor_id);

    const lesson = new LessonEntity();
    const schedule = new ScheduleEntity();

    lesson.chapter = chapterCreate;
    lesson.Class = roomClass;
    const lessonCreate = await LessonEntity.create(lesson).save();
    schedule.lesson = lessonCreate;
    schedule.Class = roomClass;
    schedule.topic = data.topic;
    schedule.date = new Date(date_schedule).toISOString().split('T')[0];
    schedule.description = data.description ? data.description : '';

    const durationParts = duration_time.split(':');
    const durationMinutes =
      parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    schedule.start_date = startDate;
    schedule.duration_time = endDate;
    console.log(startDate, endDate);
    const dataSchedule = await ScheduleEntity.create(schedule).save();
    const attendance = new AttendanceEntity();
    attendance.schedule = dataSchedule;
    await Promise.all(
      roomClass.student.map(async (item) => {
        attendance.student = item;
        await AttendanceEntity.create(attendance).save();
      }),
    );
    return true;
  }

  async GetAllSchedule(tutor_id: number) {
    const data = await ScheduleEntity.findAllSchedule(tutor_id);

    return TutorGetAllScheduleSerialization.fromPlainArray(data);
  }

  async GetDetailSchedule(schedule_id: number, tutor_id: number) {
    const data = await ScheduleEntity.findScheduleById(schedule_id, tutor_id);
    console.log(data);
    return data;
  }
  async GetLessonByClassAndChapter(class_id: number, chapter_id: number) {
    const findLesson = await LessonEntity.findLessonByChapterIdAndClassId(
      chapter_id,
      class_id,
    );
    return findLesson;
  }

  async UpdateStatusSchedule(schedule_id: number, data: scheduleStatus) {
    const schedule = await ScheduleEntity.findOne({
      where: { id: schedule_id },
    });
    if (!schedule) {
      throw new HttpException('Schedule not found', 400);
    }
    const attendance = await AttendanceEntity.find({
      where: { schedule: { id: schedule_id } },
    });
    if (data === scheduleStatus.CANCELED) {
      Promise.all(
        attendance.map(async (item) => {
          await AttendanceEntity.update(
            { id: item.id },
            { status: status_attendance.CANCEL },
          );
        }),
      );
    }

    await ScheduleEntity.update({ id: schedule_id }, { status: data });
    return await ScheduleEntity.findOne({ where: { id: schedule_id } });
  }

  async GetAllScheduleByClass(
    class_id: number,
    tutor_id: number,
    date: string,
  ) {
    console.log(typeof date);
    const input = date;

    const parts = input.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);

    const firstDay = new Date(year, month - 1, 1);
    const formattedFirstDay = `${firstDay.getFullYear()}-${(firstDay.getMonth() + 1).toString().padStart(2, '0')}-${firstDay.getDate().toString().padStart(2, '0')}`;

    const lastDay = new Date(year, month, 0);
    const formattedLastDay = `${lastDay.getFullYear()}-${(lastDay.getMonth() + 1).toString().padStart(2, '0')}-${lastDay.getDate().toString().padStart(2, '0')}`;

    const data = await AttendanceEntity.findAllAttendanceOfClass(
      class_id,
      tutor_id,
      formattedFirstDay,
      formattedLastDay,
    );

    return TutorAttendanceStudentSerialization.fromPlainArray(data);
  }

  async ActionMarkPresentStudentBySchedule(
    data: TutorMarkPresentDto,
    tutor_id: number,
  ) {
    const { date, day, present, room_id, studentId } = data;
    const parts = date.split('/');
    const month = parts[0];
    const year = parts[1]; // Năm
    const dayFormat = day.padStart(2, '0');

    const formattedDate = `${year}-${month}-${dayFormat}`;
    const checkScheduleDay = await ScheduleEntity.findScheduleByStartDate(
      formattedDate,
      room_id,
    );
    console.log(checkScheduleDay);
    if (!checkScheduleDay) {
      throw new HttpException(
        'This Student does not have any schedules during this time',
        400,
      );
    }
    console.log(checkScheduleDay.status);
    if (
      checkScheduleDay &&
      checkScheduleDay.status !== 'In Progress' &&
      checkScheduleDay.status !== 'Completed'
    ) {
      throw new HttpException(
        'You cannot take attendance for students whose schedules have not yet been started or completed',
        400,
      );
    }
    // const attendance = new AttendanceEntity();
    // attendance.day = Number(day);
    // attendance.present = present;
    // attendance.schedule = checkScheduleDay;
    // attendance.student = await StudentAdvanceEntity.findOne({
    //   where: { id: studentId },
    // });
    // await AttendanceEntity.create(attendance).save();
    const checkAttendance = await AttendanceEntity.findOne({
      where: {
        schedule: { id: checkScheduleDay.id },
        student: { id: studentId },
      },
    });
    if (checkAttendance.status === status_attendance.CANCEL) {
      throw new HttpException(
        'You cannot mark attendance for students whose attendance has been canceled',
        400,
      );
    }

    if (checkAttendance) {
      checkAttendance.present = present;
      await checkAttendance.save();
    } else {
      const attendance = new AttendanceEntity();
      attendance.day = Number(day);
      attendance.present = present;
      attendance.schedule = checkScheduleDay;
      attendance.student = await StudentAdvanceEntity.findOne({
        where: { id: studentId },
      });
      await AttendanceEntity.create(attendance).save();
    }
    return checkScheduleDay;
  }

  async GetProfileTutor(tutor_id: number) {
    const data = await TutorAdvanceEntity.findTutorByTutorId(tutor_id);

    return TutorGetProfileSerialization.fromPlain(data);
  }
}
