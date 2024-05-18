import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RoomService } from './services/room.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
