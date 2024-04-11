import { User } from 'src/common/databases/datasource/entities/user.entity';

import { UserCreateSerialization } from '../../serialization/create-user.serialization';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserService {
  createUser: (user: UserCreateSerialization) => Promise<User>;
}
