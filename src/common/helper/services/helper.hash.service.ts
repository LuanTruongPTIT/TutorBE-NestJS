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

  bcryptCompare(passwordString: string, passwordHashed: string): boolean {
    return compareSync(passwordString, passwordHashed);
  }
}
