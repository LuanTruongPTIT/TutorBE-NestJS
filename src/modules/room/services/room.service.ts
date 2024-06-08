import { Injectable } from '@nestjs/common';
import { Chapter } from 'src/common/databases/datasource/entities/chapter.entity';
import { ClassEntity } from 'src/common/databases/datasource/entities/class.entity';
import { LessonEntity } from 'src/common/databases/datasource/entities/lesson.entity';

@Injectable()
export class RoomService {
  async GetCourseByClassOfTutor(classId: number, tutorId: number) {
    return await ClassEntity.findCourseByClassOfTutor(classId, tutorId);
  }

  async GetAllChapterNotCompleteByClassId(classId: number) {
    const courseData = await ClassEntity.findCourseByClassId(classId);

    const chapterAll = await Chapter.findChapterByCourseId(
      courseData.course.id,
    );

    const chapterComplete = await LessonEntity.findChapterCompleteByClassId(
      classId,
      courseData.course.id,
    );
    // console.log(chapterAll);

    const result = await Promise.all(
      chapterAll.map((chapter) => {
        const isComplete = chapterComplete.some(
          (complete) => complete.chapter.id === chapter.id,
        );
        if (!isComplete) {
          return chapter;
        }
      }),
    );
    const resultParse = result.filter((item) => {
      console.log(item);
      return item !== undefined;
    });
    const data = {
      course: courseData.course,
      chapters: resultParse,
    };
    return data;
  }
}
