import { Controller, Get, Post as Create, Param, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';
import { Post } from './post.schema';

const Validate = (data: CreatePostDto): CreatePostDto => data;
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':username')
  async getPostsBy(@Param('username') username: string): Promise<Post[]> {
    return this.postService.getPostBy(username);
  }

  @Create()
  async createPost(@Body() newPost: CreatePostDto): Promise<Post | string> {
    try {
      return this.postService.createPost(Validate(newPost));
    } catch {
      return 'Invalid Data';
    }
  }
}
