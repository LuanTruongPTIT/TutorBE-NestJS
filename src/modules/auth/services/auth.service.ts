import { Injectable } from '@nestjs/common';
import { HelperHashService } from 'src/common/helper/services/helper.hash.service';
import { IAuthPassword } from '../interfaces/auth.interface';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from '../repository/auth.repository';
import { HelperEncryptionService } from 'src/common/helper/services/helper.encryption.service';
import { User } from 'src/common/databases/datasource/entities/user.entity';
import { Auth } from 'src/common/databases/datasource/entities/auth.entity';

@Injectable()
export class AuthService {
  private readonly passwordSaltLength: number;
  private readonly accessTokenSecretKey: string;
  private readonly accessTokenExpirationTime: number;
  private readonly refreshTokenSecretKey: string;
  private readonly refreshTokenExpirationTime: number;
  constructor(
    private readonly helperHashService: HelperHashService,
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
    private readonly helperEncryptionService: HelperEncryptionService,
  ) {
    this.passwordSaltLength = this.configService.get<number>(
      'auth.password.saltLength',
    );
    this.accessTokenSecretKey = this.configService.get<string>(
      'auth.accesstoken.accesstokensecretKey',
    );
    this.refreshTokenSecretKey = this.configService.get<string>(
      'auth.refreshtoken.refreshtokensecretKey',
    );
    (this.accessTokenExpirationTime = this.configService.get<number>(
      'auth.accesstoken.accesstokenexpirationtime',
    )),
      (this.refreshTokenExpirationTime = this.configService.get<number>(
        'auth.refreshtoken.refreshtokenexpirationtime',
      ));
  }
  async createSalt(length: number): Promise<string> {
    return this.helperHashService.randomSalt(length);
  }

  async createPassword(password: string): Promise<IAuthPassword> {
    const salt: string = await this.createSalt(this.passwordSaltLength);
    const passwordHash = this.helperHashService.bcrypt(password, salt);
    return {
      passwordHash,
      salt,
    };
  }
  async existedUserByEmail(email: Record<string, string>): Promise<boolean> {
    return await this.authRepository.existedField(email);
  }
  async createAccessToken(user: any): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(
      { user: user },
      {
        secretKey: this.accessTokenSecretKey,
        // expiredIn: 3600,,
        expiredIn: 2592000,
      },
    );
  }
  async createRefreshToken(user: Record<string, any>): Promise<string> {
    return this.helperEncryptionService.jwtEncrypt(
      { data: user },
      {
        secretKey: this.refreshTokenSecretKey,
        expiredIn: 2592000,
      },
    );
  }
  async validateAccessToken(token: string): Promise<boolean> {
    return this.helperEncryptionService.jwtVerify(token, {
      secretKey: this.accessTokenSecretKey,
    });
  }
  async validateRefreshToken(token: string): Promise<boolean> {
    return this.helperEncryptionService.jwtVerify(token, {
      secretKey: this.refreshTokenSecretKey,
    });
  }

  decodeToken(token: string): Record<string, any> {
    return this.helperEncryptionService.jwtDecrypt(token);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await this.helperHashService.bcryptCompare(password, hash);
  }
  async getUserByEmail(email: string) {
    const response = await Auth.findOne({
      where: { email },
      relations: ['user', 'role'],
    });
    return response;
  }

  async getUserByEmailWithRelations(auth_id: number) {
    const response = await User.findByEmailWithRelations(auth_id);
    return response;
  }
}
