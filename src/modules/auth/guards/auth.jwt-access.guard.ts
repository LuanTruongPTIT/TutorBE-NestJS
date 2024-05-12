import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthJwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(
        configService.get<string>('auth.prefixAuthorization'),
      ),
      ignoreExpiration: true,
      jsonWebTokenOptions: {
        ignoreNotBefore: false,
      },
      secretOrKey: configService.get<string>(
        'auth.accesstoken.accesstokensecretKey',
      ),
    });
  }

  async validate(data: any) {
    console.log('AuthJwtAccessStrategy -> validate -> data', data);
    return data['user'];
  }
}
