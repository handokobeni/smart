import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { HelloResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): HelloResponse {
    return this.appService.getHello();
  }
}
