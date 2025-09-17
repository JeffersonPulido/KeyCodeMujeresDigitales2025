import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getStatus(): { status: string, time: Date | string }{
    return { status: 'ok', time: new Date().toISOString() };
  }
}
