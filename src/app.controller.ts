import { Controller, Delete, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete('all-data')
  @HttpCode(204)
  async deleteAllData(): Promise<void> {
    await this.appService.deleteAllData();
  }
}
