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
    const { email } = data;
    const checkUser = await Auth.findOne({ where: { email } });
    if (checkUser) {
      throw new HttpException('Email already exists', 400);
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

  async GetStudent() {}
}
