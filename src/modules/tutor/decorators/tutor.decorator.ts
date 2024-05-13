import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ENUM_ROLE_TYPE } from 'src/common/policy/interfaces/policy.interface';
import { AuthJwtAccessGuard } from 'src/modules/auth/guards/auth.jwt-access.strategy';
import { ROLE_TYPE_META_KEY } from 'src/modules/role/constants/role.constants';
import { RolePayloadTypeGuard } from 'src/modules/role/guards/payload/role.payload.type.guard';

export function AuthJwtAdminAndTutorAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [
      ENUM_ROLE_TYPE.SUPER_ADMIN,
      ENUM_ROLE_TYPE.TUTOR,
    ]),
  );
}
