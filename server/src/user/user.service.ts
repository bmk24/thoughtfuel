import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUsernameDto } from './user.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './user.schema';
// * import { find } from 'lodash';
import { createHmac } from 'crypto';

// ? Hashing Passwords To Store Them;
//! Deprecated
const hash = (password: string, username: string): string =>
  createHmac('sha512', password)
    .update(username)
    .update('AjsQ72Azrt1VajWYH57L9bGRmsRAzxEh')
    .digest('hex');

class UserClass {
  username: string;
  name: string;
  password: string;
  phone: string;
  bio = ' ';
  karma = 0;
  followers: string[] = [];
  following: string[] = [];
  constructor({ username, name, password, phone, bio }: CreateUserDto) {
    this.password = hash(password, username);
    this.username = username;
    this.name = name;
    this.phone = phone;
    if (bio) this.bio = bio;
  }
}

function ValidateLogin(data: LoginUsernameDto): LoginUsernameDto {
  if (data.username && data.password) {
    return data;
  } else {
    throw new Error();
  }
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection('user') private connection: Connection,
  ) {}

  async getUser(username: string): Promise<User[]> {
    // ? Perfect Function Don't Touch It
    console.log(`Data Requested For ${username}`);
    return this.userModel.find({ username }).exec();
  }

  async createUser(data: CreateUserDto): Promise<User | string> {
    console.log({ data });
    // * DOCS: Call this.userModel.find() instead of const {find} = this.userModel; find()
    const existingUser = (
      await this.userModel.find({ username: data.username })
    )[0];

    const existingPhone = (await this.userModel.find({ phone: data.phone }))[0];
    // ? Separate Errors for Username and Phone; DONE
    if (existingUser) return 'Username Already Exists';
    if (existingPhone) return 'Phone Number Already Registered';

    const newUser = new this.userModel(new UserClass(data));
    return newUser.save();
  }

  async Login({
    username,
    password,
  }: LoginUsernameDto): Promise<User | string> {
    try {
      //? TODO: Implement Phone Login
      const user = await this.userModel
        .find(ValidateLogin({ username, password: hash(password, username) }))
        .exec();

      //? TODO: Separate Errors for Password and Username;
      if (!user[0]) {
        return 'Username or Password is Wrong';
      } else {
        return user[0];
      }
    } catch {
      return 'Invalid Data';
    }
  }
}
