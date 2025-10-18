import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) { }

  //Endpoint de ruta localhost:3000/ que me responde un Hola Mundo
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Endpoint de ruta localhost:3000/status que me responde el estado de mi app
  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }
}
