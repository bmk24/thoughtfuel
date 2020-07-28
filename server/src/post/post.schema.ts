import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  upVotes: number;

  @Prop({ required: true })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

export class Comment {
  postId: string;
  owner: string;
  upVotes: number;
}

//   export class Post {
//     constructor(
//       public readonly title: string,
//       public readonly owner: string,
//       public readonly id: string = 'uwu',
//       public readonly createdAt: Date = new Date(),
//       public readonly upVotes: number = 0,
//       public readonly comments: Comment[] = [],
//     ) {}
//   }
