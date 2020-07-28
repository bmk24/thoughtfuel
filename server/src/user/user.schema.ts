import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const required = true;

@Schema()
export class User extends Document {
  @Prop({ required })
  username: string;

  @Prop({ required })
  password: string;

  @Prop({ required })
  name: string;

  @Prop({ required })
  phone: string;

  @Prop({ required })
  bio: string;

  @Prop({ required })
  karma: number;

  @Prop({ required })
  followers: string[];

  @Prop({ required })
  following: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
