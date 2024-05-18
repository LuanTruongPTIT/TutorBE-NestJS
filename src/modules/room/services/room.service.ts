import { Injectable } from '@nestjs/common';
import { Chapter } from 'src/common/databases/datasource/entities/chapter.entity';
import { ClassEntity } from 'src/common/databases/datasource/entities/class.entity';
import { LessonEntity } from 'src/common/databases/datasource/entities/lesson.entity';

@Injectable()
export class RoomService {
  async GetCourseByClassOfTutor(classId: number, tutorId: number) {
    return await ClassEntity.findCourseByClassOfTutor(classId, tutorId);
  }

  async GetAllChapterNotCompleteByClassId(classId: number, course_id: number) {
    const chapterAll = await Chapter.findChapterByCourseId(course_id, classId);

    const chapterComplete = await LessonEntity.findChapterCompleteByClassId(
      classId,
      course_id,
    );
    console.log(chapterComplete);
    // return Promise.all(
    //   chapterAll.map((chapter) => {
    //     console.log(chapter);
    //     return chapterComplete.filter((item) => item.id === chapter.id);
    //   }),
    // );
    return chapterAll;
  }
}
