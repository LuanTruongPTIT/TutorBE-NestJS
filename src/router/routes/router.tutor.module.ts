import { Module } from '@nestjs/common';
import { TutorController } from 'src/modules/tutor/controller/tutor.controller';
import { TutorModule } from 'src/modules/tutor/tutor.module';

@Module({
  controllers: [TutorController],
  providers: [],
  imports: [TutorModule],
  exports: [],
})
export class RoutesTutorModule {}
