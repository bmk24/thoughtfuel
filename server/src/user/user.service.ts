import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Connection } from 'mongoose';
import { createHmac } from 'crypto';
import { CreateUserDto } from './user.dto';

const SecretKey = '';
const hash = (password: string, username: string): string =>
  createHmac('sha256', password)
    .update(SecretKey)
    .update(username)
    .digest('hex');

class UserConstructor {
  //? Scaffold for Generating Data to be Inserted into the Database;
  username: string;
  password: string;
  name: string;
  phone: string;
  bio = '';
  karma = 0;
  followers: string[] = [];
  following: string[] = [];

  constructor({ username, password, name, phone }: CreateUserDto) {
    this.username = username;
    this.password = hash(password, username);
    this.name = name;
    this.phone = phone;
  }
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection('user') private connection: Connection,
  ) {
    console.log('New Service!');
  }

  async getUser(username: string): Promise<User[]> {
    //? Note to self (aether) :- Don't Touch this.
    //! TODO :- Abstract Sensitive Information
    console.log(`Data Requested for ${username}`);
    return this.userModel.find({ username }).exec();
  }

  async createUser(data: CreateUserDto): Promise<any | string> {
    console.log(data);
    // * Call this.userModel.find() const {find} = this.userModel; find(); That Doesn't work for some reason
    const existingPhone = (
      await this.userModel.find({ phone: data.phone }).exec()
    ).length;

    const existingUsername = (
      await this.userModel.find({ username: data.username }).exec()
    ).length;

    if (existingPhone) return 'Phone Number Already Registered';
    if (existingUsername) return 'Username Not Available';

    const newUser = new this.userModel(new UserConstructor(data));
    return newUser.save();
  }
}
