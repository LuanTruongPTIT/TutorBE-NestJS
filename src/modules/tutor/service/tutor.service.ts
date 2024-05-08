import { Injectable } from '@nestjs/common';
import { TutorRepository } from '../repository/tutor.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { BecomeTutorDto } from '../dto/register-tutor.dto';
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
}
