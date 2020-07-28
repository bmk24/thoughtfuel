import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  bio: string;

  @Prop({ required: true })
  karma: number;

  @Prop({ required: true })
  followers: string[];

  @Prop({ required: true })
  following: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
