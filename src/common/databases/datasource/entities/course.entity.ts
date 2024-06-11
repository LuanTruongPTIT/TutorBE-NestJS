import { AbstractEntityIntId } from 'src/common/databases/abstracts/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Chapter } from './chapter.entity';
import { ClassEntity } from './class.entity';

@Entity({ name: 'course', schema: 'public' })
export class Course extends AbstractEntityIntId<Course> {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.courses, {
    cascade: true,
  })
  user: User;

  @Column({ type: 'varchar', length: 300, nullable: true })
  imageUrl: string;

  @OneToMany(() => Chapter, (chapter) => chapter.course)
  chapters: Chapter[];

  @OneToMany(() => ClassEntity, (room) => room.course)
  Class: ClassEntity[];

  static async findCourseById(id: number) {
    return this.findOne({
      where: { id },
      relations: ['chapters'],
      order: { chapters: { position: 'ASC' } },
    });
  }
  static async updateCourseById(id: number, data: Partial<Course>) {
    return this.update({ id }, data);
  }
  static async findCourseByUserId(id: number, id_course: number) {
    return this.findOne({
      where: { id: id_course, user: { id } },
      relations: ['chapters'],
    });
  }

  static async getAllCourseOfUser(id: number) {
    return this.find({
      where: { user: { id } },
      relations: ['chapters'],
    });
  }

  static async findCourseByNameAndTutorId(title: string, id: number) {
    return this.findOne({
      where: { title, user: { id } },
    });
  }
  static async findCourseByName(title: string, tutor_id: number) {
    return this.findOne({
      where: {
        title,
        user: { id: tutor_id },
      },
    });
  }
  static async GetAllCourse() {
    return await this.createQueryBuilder('course')
      .select([
        'course.id',
        'course.title',
        'course.price',
        'class.id',
        'class.name',
        'student_advance.id',
        'student_advance.firstName',
        'tutor.id',
        'tutor.firstName',
      ])
      .leftJoin('course.Class', 'class')
      .leftJoin('class.student', 'student_advance')
      .leftJoin('class.tutor', 'tutor')
      // .leftJoinAndSelect('class.student', 'student')
      .getMany();
  }
}
