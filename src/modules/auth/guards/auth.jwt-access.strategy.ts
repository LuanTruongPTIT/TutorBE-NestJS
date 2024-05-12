import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ENUM_AUTH_STATUS_CODE_ERROR } from '../constants/auth.status-code.constant';

@Injectable()
export class AuthJwtAccessGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: Error, user: TUser): TUser {
    console.log('AuthJwtAccessGuard -> handleRequest -> user', user);
    if (err || !user) {
      console.log('AuthJwtAccessGuard -> handleRequest -> err', user);
      throw new UnauthorizedException({
        status: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_JWT_ACCESS_TOKEN_ERROR,
        message: 'auth.error.accessTokenUnauthorized',
        _error: err,
      });
    }

    return user;
  }
}
