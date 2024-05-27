import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';

@Module({
  providers: [SocketService],
  controllers: [SocketController],
  exports: [SocketService],
})
export class SocketModule {}
