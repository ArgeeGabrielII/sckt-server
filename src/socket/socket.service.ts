import { Injectable } from '@nestjs/common';
import { EchoResponse } from './interface/types';

@Injectable()
export class SocketService {
  echo(id: string | number, message: string): EchoResponse {
    return {
      id,
      result: { message },
    };
  }
}
