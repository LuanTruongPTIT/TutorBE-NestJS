import { UserRepository } from './../repository/user.repository';
import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { UserCreateSerialization } from '../serialization/create-user.serialization';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { Auth } from 'src/common/databases/datasource/entities/auth.entity';
import { AuthRepository } from '../../auth/repository/auth.repository';
import { EmailService } from 'src/common/email/email.service';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly authService: AuthService,
  ) {}
  async createUser(data: UserCreateSerialization): Promise<any> {
    const { email, password, name, role_id, email_verify } = data;

    const user = new User();

    const auth = new Auth();
    auth.email = email;
    auth.password = password;
    auth.email_verify = email_verify;
    user.fullName = name;
    user.auth = auth;
    user.role = [role_id];
    const result = await this.userRepository.create(user);

    // await this.userRepository.save(user);

    const token = await this.authService.createAccessToken(result.id);
    await this.emailService.sendEmailConfirm(user.fullName, email, token);
  }

  async findUserById(id: number) {
    const response = await this.userRepository.findById(id);
    return response;
  }
}
