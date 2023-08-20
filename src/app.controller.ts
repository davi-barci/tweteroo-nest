import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post()
  @HttpCode(200)
  createUser(@Body() body: CreateUserDto) {
    return this.appService.signUp(body);
  }
}
