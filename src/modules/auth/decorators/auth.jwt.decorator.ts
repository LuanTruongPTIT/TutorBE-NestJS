import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthJwtAccessGuard } from '../guards/auth.jwt-access.strategy';
import { UserPayloadPutToRequestPayload } from 'src/modules/user/decorator/user.payload.put-to-request.payload';
import { RolePayloadTypeGuard } from 'src/modules/role/guards/payload/role.payload.type.guard';
import { ROLE_TYPE_META_KEY } from 'src/modules/role/constants/role.constants';
import { ENUM_ROLE_TYPE } from 'src/common/policy/interfaces/policy.interface';

export function AuthJwtAccessProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthJwtAccessGuard));
}
export function UserProtected(): MethodDecorator {
  return applyDecorators(UseGuards(UserPayloadPutToRequestPayload));
}
export function AuthJwtAdminAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.ADMIN,
    ]),
  );
}
