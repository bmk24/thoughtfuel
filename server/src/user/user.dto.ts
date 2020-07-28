export class CreateUserDto {
  username: string;
  password: string;
  phone: string;
  name: string;
}

export class LoginUserDto {
  username?: string;
  phone?: string;
  password: string;
}
