import { UserRepository } from './../repository/user.repository';
import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { UserCreateSerialization } from '../serialization/create-user.serialization';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { Auth } from 'src/common/databases/datasource/entities/auth.entity';
import { AuthRepository } from '../../auth/repository/auth.repository';
import { EmailService } from 'src/common/email/email.service';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { RoleService } from 'src/modules/role/service/role.service';
import { Role } from 'src/common/databases/datasource/entities/role.entity';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}
  async createUser(data: UserCreateSerialization): Promise<any> {
    const { email, password, name, email_verify } = data;
    const role = (await this.roleService.findRoleByName({
      role_name: 'user',
    })) as Role;
    const user = new User();
    if (!role) {
    }
    const auth = new Auth();
    auth.email = email;
    auth.password = password;
    auth.email_verify = email_verify;
    user.fullName = name;
    user.auth = auth;
    user.email = email;
    auth.role = [role];
    const result = await this.userRepository.create(user);

    // await this.userRepository.save(user);

    const token = await this.authService.createAccessToken(result.id);
    await this.emailService.sendEmailConfirm(user.fullName, email, token);
  }

  async findUserById(id: number) {
    const response = await this.userRepository.findById(id);
    return response;
  }

  async comparePassword(password: string, hash: string) {
    return await this.authService.comparePassword(password, hash);
  }
}
