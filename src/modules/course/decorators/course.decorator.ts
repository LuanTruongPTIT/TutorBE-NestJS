import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ENUM_ROLE_TYPE } from 'src/common/policy/interfaces/policy.interface';
import { AuthJwtAccessGuard } from 'src/modules/auth/guards/auth.jwt-access.strategy';
import { RolePayloadTypeTutorGuard } from '../guards/role.payload.type.tutor';
import { ROLE_TYPE_META_KEY } from 'src/modules/role/constants/role.constants';

export function AuthJwtTutorAccessProtected(): MethodDecorator {
  return applyDecorators(
    UseGuards(AuthJwtAccessGuard, RolePayloadTypeTutorGuard),
    SetMetadata(ROLE_TYPE_META_KEY, [ENUM_ROLE_TYPE.TUTOR]),
  );
}
