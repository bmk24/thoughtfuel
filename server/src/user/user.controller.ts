import { Controller, Get, Body, Param, Post as Create } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUsernameDto } from './user.dto';
import { User } from './user.schema';

function ValidateCreate(data: CreateUserDto): CreateUserDto {
  const isValid = data.name && data.password && data.phone && data.username;
  if (isValid) {
    return data;
  } else {
    throw new Error();
  }
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUsers(@Param('username') username: string): Promise<User[]> {
    // ! Perfect Function Don't Touch It; TODO: Abstract Data;
    // ? Get User Details With Username
    return this.userService.getUser(username);
  }

  @Create()
  async createUser(@Body() createUser: CreateUserDto): Promise<User | string> {
    try {
      return this.userService.createUser(ValidateCreate(createUser));
    } catch {
      return 'Invalid Data';
    }
  }

  @Get()
  async Login(@Body() loginData: LoginUsernameDto): Promise<User | string> {
    return this.userService.Login(loginData);
  }
}
