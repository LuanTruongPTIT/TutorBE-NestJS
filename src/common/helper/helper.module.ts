import { Module } from '@nestjs/common';
import { HelperHashService } from './services/helper.hash.service';
import { HelperEncryptionService } from './services/helper.encryption.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('helper.jwt.defaultSecretKey'),
        signOptions: {
          expiresIn: configService.get<string>(
            'helper.jwt.defaultExpirationTime',
          ),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [HelperHashService, HelperEncryptionService],
  exports: [HelperHashService, HelperEncryptionService],
})
export class HelperModule {}
