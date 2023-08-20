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

  getUserAvatarByUsername(username: string) {
    const user = this.users.find((user) => user.username === username);
    return user ? user.avatar : null;
  }

  getPaginatedTweets(startIndex: number, endIndex: number) {
    const reversedTweets = [...this.tweets].reverse();
    const paginatedTweets = reversedTweets.slice(startIndex, endIndex);

    return paginatedTweets.map((tweet) => ({
      username: tweet.username,
      avatar: this.getUserAvatarByUsername(tweet.username),
      tweet: tweet.tweet,
    }));
  }
}
