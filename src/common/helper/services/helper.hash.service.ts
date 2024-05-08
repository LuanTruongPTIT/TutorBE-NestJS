import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class HelperHashService {
  randomSalt(length: number): string {
    return genSaltSync(length);
  }

  bcrypt(passwordString: string, salt: string): string {
    return hashSync(passwordString, salt);
  }

  async bcryptCompare(
    passwordString: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return await compareSync(passwordString, passwordHashed);
  }
}
