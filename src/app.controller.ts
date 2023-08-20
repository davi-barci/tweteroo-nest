import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('/tweets')
  @HttpCode(200)
  getTweets(@Query('page') page?: number) {
    if (page && (isNaN(page) || page < 1)) {
      return {
        message: 'Informe uma página válida!',
      };
    }

    const tweetsPerPage = 15;
    const startIndex = (page - 1) * tweetsPerPage || 0;
    const endIndex = startIndex + tweetsPerPage;

    const paginatedTweets = this.appService.getPaginatedTweets(
      startIndex,
      endIndex,
    );

    return paginatedTweets;
  }

  @Get('/tweets/:username')
  @HttpCode(200)
  getUserTweets(@Param('username') username: string) {
    const tweets = this.appService.getUserTweets(username);
    return tweets;
  }
}
