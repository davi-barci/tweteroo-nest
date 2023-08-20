import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { Tweet } from './entities/tweet.entity';
import { CreatTweetDto } from './dtos/tweet.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm OK!";
  }

  signUp(body: CreateUserDto) {
    const user = new User(body.username, body.avatar);
    return this.users.push(user);
  }

  createTweet(body: CreatTweetDto) {
    if (!this.users.some((user) => user.username === body.username)) {
      throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
    }

    const tweet = new Tweet(body.username, body.tweet);
    return this.tweets.push(tweet);
  }
}
