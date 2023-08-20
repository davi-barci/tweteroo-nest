import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';
import { CreatTweetDto } from './dtos/tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  @HttpCode(200)
  createUser(@Body() body: CreateUserDto) {
    return this.appService.signUp(body);
  }

  @Post('/tweets')
  @HttpCode(200)
  createTweet(@Body() body: CreatTweetDto) {
    return this.appService.createTweet(body);
  }
}
