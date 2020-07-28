import { Controller, Get, Body, Injectable } from '@nestjs/common';
import { LoginUserDto } from './user.dto';
import { User } from './user.schema';

function Validate(data: LoginUserDto): LoginUserDto {
  if (data.password && (data.phone || data.username)) return data;
  else throw new Error('Invalid Data');
}

//? Implement Auth with JWT
@Injectable()
export class AuthService {
  async Login({ username, password }: LoginUserDto): Promise<User | string> {
    //? TODO :- Implement Phone Login
    Validate({ username, password });
    return 'Implement Login';
  }
}

@Controller('user/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async Login(@Body() data: LoginUserDto): Promise<User | string> {
    try {
      return this.authService.Login(data);
    } catch {
      return 'Invalid Data';
    }
  }
}
