import { Controller, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { EchoRequest, EchoResponse } from './types';
import * as net from 'net';
import * as fs from 'fs';

@Controller()
export class AppController implements OnModuleInit {
    constructor(private readonly echoService: AppService) {}

    onModuleInit() {
        const socketPath = process.argv[2]; // This will be /var/run/dev-test/sock

        console.log({ socketPath });

        if (!socketPath) {
            throw new Error('Socket path must be provided as the first argument.');
        }

        // Remove the socket file if it already exists
        if (fs.existsSync(socketPath)) {
            fs.unlinkSync(socketPath);
        }

        const server = net.createServer((client) => {
            client.setEncoding('utf8');
            let buffer = '';

            client.on('data', (data) => {
                buffer += data;
                let boundary = buffer.indexOf('\n');
                while (boundary !== -1) {
                    const message = buffer.slice(0, boundary).trim();
                    buffer = buffer.slice(boundary + 1);

                    try {
                        const request: EchoRequest = JSON.parse(message);
                        const { method, params } = request;

                        // Validate the request
                        // TOOD: Add handler for evluate
                        if (method === 'echo' && params && typeof params.message === 'string') {
                            const response: EchoResponse = this.echoService.echo(request.id, request.params.message);
                            client.write(JSON.stringify(response) + '\n');
                        } else {
                            client.end();
                        }
                    } catch (error) {
                        console.log('Error parsing message:', error);
                        client.end();
                    }

                    boundary = buffer.indexOf('\n');
                }
            });

            client.on('end', () => {
                buffer = '';
            });
        });

        server.listen(socketPath, () => {
            console.log(`Server listening on ${socketPath}`);
        });
    }
}
