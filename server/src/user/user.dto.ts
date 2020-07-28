export class CreateUserDto {
  username: string;
  name: string;
  password: string;
  phone: string;
  bio?: string;
}

export class LoginUsernameDto {
  public username: string;
  public password: string;
}
