/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';
import datasource from 'src/common/databases/datasource';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';
import { UserLoginDto } from '../dto/sign-in.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly debugService: DebuggerService,
  ) {}

  @Post('/signIn')
  async signIn(@Body() data: UserLoginDto, @Res() res) {
    this.debugService.info(
      `authcontroller, Log: signIn, data: ${JSON.stringify(data)}`,
    );
    const { email, password } = data;
    const auth = await this.authService.getUserByEmail(email);
    if (!auth) {
      return res
        .status(400)
        .json({ status: 400, message: 'User is not existed' });
    }
    const isMatch = await this.authService.comparePassword(
      password,
      auth.password,
    );
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: 400, message: 'Password is not correct' });
    }
    if (!auth.email_verify) {
      return res
        .status(400)
        .json({ status: 400, message: 'Email is not verify' });
    }
    const payloadToken = {
      id: auth.user.id,
      role: auth.role[0].role_name,
    };
    const accesstoken = await this.authService.createAccessToken(payloadToken);
    const user = await this.authService.getUserByEmailWithRelations(auth.id);

    const refreshtoken =
      await this.authService.createRefreshToken(payloadToken);
    console.log('user', user, 'role', auth.role[0].role_name);
    return res.status(200).json({
      user: auth.user,
      role: auth.role[0].role_name,
      accesstoken: accesstoken,
      refreshtoken: refreshtoken,
      expiresInRefreshToken: 2592000,
      exipresInAccessToken: 3600,
    });
  }

  @Post('/email-verification')
  async verifyEmail(@Body() data: Record<string, any>, @Res() res) {
    this.debugService.info('authcontroller,start verify email');
    const { token } = data;
    const { user } = this.authService.decodeToken(token);

    if (user) {
      const result = await datasource
        .getRepository(User)
        .findOne({ where: { id: user }, relations: ['auth'] });

      if (!result.auth.email_verify) {
        result.auth.email_verify = true;
        await result.save();
      } else {
        return res
          .status(400)
          .json({ message: 'user have already verify email' });
      }
    } else {
      return res.status(400).json({ message: 'User is not existed' });
    }
    return res
      .status(200)
      .json({ success: true, message: 'Verify Email is success' });
  }

  @Post('/sign-in/tutor')
  async signInTutorial(@Body() data: UserLoginDto, @Res() res) {
    console.log('data', data);
    const { email, password } = data;
    const auth = await this.authService.getUserByEmail(email);
    console.log('auth', auth);
    if (!auth) {
      return res.status(422).json({
        status: 400,
        message: 'Your account is not part of our organization',
      });
    }
    const isMatch = await this.authService.comparePassword(
      password,
      auth.password,
    );
    if (!isMatch) {
      return res
        .status(422)
        .json({ status: 400, message: 'Password is not correct' });
    }
    if (!auth.email_verify) {
      return res
        .status(422)
        .json({ status: 400, message: 'Email is not verify' });
    }
    const payloadToken = {
      id: auth.user.id,
      role: auth.role[0].role_name,
    };
    const accesstoken = await this.authService.createAccessToken(payloadToken);
    const user = await this.authService.getUserByEmailWithRelations(auth.id);

    const refreshtoken =
      await this.authService.createRefreshToken(payloadToken);
    return res.status(200).json({
      user: auth.user,
      role: auth.role[0].role_name,
      accesstoken: accesstoken,
      refreshtoken: refreshtoken,
      expiresInRefreshToken: 2592000,
      exipresInAccessToken: 3600,
    });
  }
}
