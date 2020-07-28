import { Controller, Get, Post as Create, Param, Body } from '@nestjs/common';
//? Would Need Later
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<any> {
    //? Return Any Data For now; Change After Mongo Integration
    return this.userService.getUser(username);
  }
}
