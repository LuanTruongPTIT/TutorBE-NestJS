import { OmitType } from '@nestjs/swagger';
import { UserRegisterDto } from '../dto/user.register.dto';
import { Role } from 'src/common/databases/datasource/entities/role.entity';

export class UserCreateSerialization extends OmitType(UserRegisterDto, [
  'confirmPassword',
]) {
  role_id: Role;
  email_verify: boolean;
}
