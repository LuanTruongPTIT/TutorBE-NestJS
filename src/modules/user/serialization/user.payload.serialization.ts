import { ENUM_POLICY_SUBJECT } from 'src/common/policy/constants/policy.enum.constant';

export class UserPayloadPermissionSerialization {
  subject: ENUM_POLICY_SUBJECT;

  action: string;
}
