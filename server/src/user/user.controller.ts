import { Controller, Get, Post as Create, Param, Body } from '@nestjs/common';
//? Would Need Later
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    //? Return Any Data For now; Change After Mongo Integration
    return this.userService.getUser(username)[0];
  }

  @Create()
  async createUser(@Body() data: CreateUserDto): Promise<User | string> {
    try {
      return this.userService.createUser(data);
    } catch {
      return 'Invalid Data';
    }
  }
}
