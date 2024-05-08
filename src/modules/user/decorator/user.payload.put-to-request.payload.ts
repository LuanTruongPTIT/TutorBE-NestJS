import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserPayloadPutToRequestPayload implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('UserPayloadPutToRequestPayload', user);
    (request as Request).user = user;
    return true;
  }
}
