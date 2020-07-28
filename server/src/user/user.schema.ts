import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const required = true;

@Schema()
export class User extends Document {
  @Prop({ required })
  username: string;

  @Prop({ required })
  name: string;

  @Prop({ required })
  password: string;

  @Prop({ required })
  phone: string;

  @Prop({ required })
  posts: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
