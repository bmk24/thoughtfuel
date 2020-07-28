//? Modules
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    UserModule,
    PostModule,
    MongooseModule.forRoot('mongodb://localhost/user', {
      connectionName: 'user',
    }),
    MongooseModule.forRoot('mongodb://localhost/post', {
      connectionName: 'post',
    }),
  ],
})
export class AppModule {}

//? TODO: GraphQL
