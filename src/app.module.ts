import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { RouterModule } from './router/router.module';

@Module({
  imports: [CommonModule, RouterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
