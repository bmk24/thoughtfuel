import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, Connection } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection('user') private connection: Connection,
  ) {
    console.log('New Service!');
  }

  //! Any Return Type For Now Change After Mongo Integration
  async getUser(username: string): Promise<any> {
    return `Data requested for ${username}.`;
  }
}
