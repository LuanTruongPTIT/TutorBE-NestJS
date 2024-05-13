import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ENUM_ROLE_TYPE } from 'src/common/policy/interfaces/policy.interface';
import { ROLE_TYPE_META_KEY } from 'src/modules/role/constants/role.constants';
import { ENUM_ROLE_STATUS_CODE_ERROR } from 'src/modules/role/constants/role.status-code.constant';

@Injectable()
export class RolePayloadTypeTutorGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredFor: ENUM_ROLE_TYPE[] = this.reflector.getAllAndOverride<
      ENUM_ROLE_TYPE[]
    >(ROLE_TYPE_META_KEY, [context.getHandler(), context.getClass()]);
    const { role } = context.switchToHttp().getRequest().user;

    console.log('role', role, requiredFor);
    if (!requiredFor || role === 'tutor') {
      return true;
    }
    const hasFor: boolean = requiredFor.includes(role.toUpperCase());
    if (!hasFor) {
      throw new ForbiddenException({
        statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_PAYLOAD_TYPE_INVALID_ERROR,
        message: 'role.error.typeForbidden',
      });
    }
    return hasFor;
  }
}
