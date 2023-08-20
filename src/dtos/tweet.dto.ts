import { IsNotEmpty, IsString } from 'class-validator';

export class CreatTweetDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  tweet: string;
}
