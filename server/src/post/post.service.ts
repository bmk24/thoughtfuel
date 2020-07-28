import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Post, Comment } from './post.schema';

class PostConstructor {
  title: string;
  owner: string;
  body: string;
  createdAt: Date;
  upVotes = 0;
  comments: Comment[] = [];

  constructor({ title, owner, body }: CreatePostDto) {
    this.title = title;
    this.owner = owner;
    this.body = body;
    this.createdAt = new Date();
  }
}

@Injectable()
export class PostService {
  //? Dummy Data
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectConnection('post') private connection: Connection,
  ) {}

  async getPostBy(owner: string): Promise<Post[]> {
    console.log(`Requested All Posts by ${owner}`);
    return this.postModel.find({ owner }).exec();
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    console.log(`Post ${post.title} Created`);
    const newPost = new this.postModel(new PostConstructor(post));
    return newPost.save();
  }
}
