import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}
