/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { UserRegisterDto } from '../dto/user.register.dto';
import { UserService } from '../services/user.service';
import { RoleService } from '../../role/service/role.service';
import { AuthService } from '../../auth/services/auth.service';

@Controller()
export class UserPublicController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly authService: AuthService,
  ) {}
  @Post('/signUp')
  async signUp(@Body() data: UserRegisterDto, @Res() res) {
    const { email, password, confirmPassword, name } = data;

    const [checkEmail, role] = await Promise.all([
      await this.authService.existedUserByEmail({ email: email }),
      await this.roleService.findRoleByName({ role_name: 'user' }),
    ]);
    if (checkEmail) {
      throw new BadRequestException({
        message: 'Email is exist',
        code: 'emai_is_existed',
        statusCode: 400,
      });
    }
    if (password !== confirmPassword) {
      throw new BadRequestException({
        message: 'Password is not match with confirm password',
        //  code: d',
        statusCode: 400,
      });
    }
    const hashPassword = await this.authService.createPassword(password);
    await this.userService.createUser({
      email,
      role_id: role,
      password: hashPassword.passwordHash,
      name,
      email_verify: false,
    });

    return res
      .status(201)
      .json({ success: true, message: 'Register is success' });
  }
}
