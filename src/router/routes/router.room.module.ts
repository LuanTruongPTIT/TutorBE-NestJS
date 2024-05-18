import { Module } from '@nestjs/common';
import { RoomController } from 'src/modules/room/controller/room.controller';
import { RoomModule } from 'src/modules/room/room.module';

@Module({
  controllers: [RoomController],
  providers: [],
  imports: [RoomModule],
  exports: [],
})
export class RoutesRoomModule {}
