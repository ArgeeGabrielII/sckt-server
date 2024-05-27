import { Injectable } from '@nestjs/common';
import { EchoResponse } from './types';

@Injectable()
export class AppService {
    echo(id: string | number, message: string): EchoResponse {
        return {
            id,
            result: { message },
        };
    }
}
