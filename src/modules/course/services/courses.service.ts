import { Injectable } from '@nestjs/common';
import { Course } from 'src/common/databases/datasource/entities/course.entity';
import { ChapterCreateDto, CourseCreateDto } from '../dto/course-create.dto';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { GetCourseUserResponseSerialization } from '../serialization/course.get-course-user.response.serialization';
import { Chapter } from 'src/common/databases/datasource/entities/chapter.entity';
import { CourseUpdateReorderChapterDto } from '../dto/course.update-reorder-chapter';
import { GetAllCourseUserResponseSerialization } from '../serialization/course.get-all-course.user.response.serialization';

@Injectable()
export class CourseService {
  constructor() {}

  async createCourse(user_id: number, data: CourseCreateDto) {
    const user = await User.findUserById(user_id);
    const course = new Course();
    course.title = data.title;
    course.user = user;
    const result = await Course.save(course);
    return result.id;
  }
  async getCourseById(user_id: number, id: number) {
    const response = await Course.findCourseById(id);

    return GetCourseUserResponseSerialization.fromPlain(response);
  }

  async updateCourse(user_id: number, id_course: number, data: any) {
    const user_course = await this.findCourseByUserId(user_id, id_course);
    if (!user_course) {
      return null;
    }
    await Course.updateCourseById(id_course, data);
    return this.findCourseByUserSerialization(user_id, id_course);
  }
  async findCourseByUserId(user_id: number, id_course: number) {
    const user_course = await Course.findCourseByUserId(user_id, id_course);
    if (!user_course) {
      return null;
    }
    return user_course;
  }
  async findCourseByUserSerialization(user_id: number, id_course: number) {
    const user_course = await Course.findCourseByUserId(user_id, id_course);
    return GetCourseUserResponseSerialization.fromPlain(user_course);
  }
  async createChapter(
    user_id: number,
    id_course: number,
    data: ChapterCreateDto,
  ) {
    const user_course = await this.findCourseByUserId(user_id, id_course);
    if (!user_course) {
      return null;
    }
    const chapter = new Chapter();
    chapter.title = data.title;
    chapter.course = user_course;

    const position = await Chapter.findLastChapterByCourseId(id_course);
    chapter.position = position?.position ? position.position + 1 : 1;
    await Chapter.save(chapter);
    return this.getCourseById(user_id, id_course);
  }

  async updateReorderChapter(
    user_id: number,
    course_id: number,
    data: CourseUpdateReorderChapterDto[],
  ) {
    const courseOwner = await Course.findCourseByUserId(user_id, course_id);
    if (!courseOwner) {
      return null;
    }
    Promise.all(
      data.map((item) => {
        Chapter.update(item.id, item);
      }),
    );
    return this.getCourseById(user_id, course_id);
  }

  async getAllCourseOfUser(user_id: number) {
    const result = await Course.getAllCourseOfUser(user_id);
    return GetAllCourseUserResponseSerialization.getArrayFromPlain(result);
  }
}
