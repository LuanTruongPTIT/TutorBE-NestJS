/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from 'src/modules/user/services/user.service';
import datasource from 'src/common/databases/datasource';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly debugService: DebuggerService,
  ) {}

  @Post('/signIn')
  async signIn(@Body() data: any) {
    return {
      accesstoken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE3MTE5MzM2NDAsImV4cCI6MTcxMTkzNzI0MH0.pawKaANAT7SJMQwrvg4wLsZW8Su8sLv1kTMFzBiqTlo',
    };
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
}
