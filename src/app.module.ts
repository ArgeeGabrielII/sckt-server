import { Module } from '@nestjs/common';
import { SocketModule } from './socket/socket.module';
import { SocketController } from './socket/socket.controller';

@Module({
  imports: [SocketModule],
  controllers: [SocketController],
})
export class AppModule {}
