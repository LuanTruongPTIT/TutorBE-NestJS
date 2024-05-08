import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { RouterModule } from './router/router.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [CommonModule, RouterModule.forRoot(), EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
