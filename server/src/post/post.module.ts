import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from './post.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Post.name, schema: PostSchema }],
      'post',
    ),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
