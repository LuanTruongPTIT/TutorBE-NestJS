import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './databases/datasource';
import datasource from './databases/datasource';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs';
import { HelperModule } from './helper/helper.module';
import { EmailModule } from './email/mail.module';
import { DebuggerLoggerModule } from './debugger/debugger.logger.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => typeormConfig,
      dataSourceFactory: async () => {
        datasource.initialize();
        return datasource;
      },
    }),
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    HelperModule,
    EmailModule,
    DebuggerLoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class CommonModule {}
