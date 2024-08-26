import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './features/users/domain/user.entity';
import { UserQueryRepository } from './features/users/repository/user.query-repository';
import { UserController } from './features/users/api/users.controller';
import { UserService } from './features/users/application/user.service';
import { BcryptService } from './infrastructure/adapters/bcrypt';
import { UserRepository } from './features/users/repository/user.repository';
import { SETTINGS } from './settings/app-settings';
import { CommentController } from './features/comments/api/comment.controller';
import { CommentQueryRepository } from './features/comments/repository/comment.query-repository';
import { CommentRepository } from './features/comments/repository/comment.repository';
import { CommentService } from './features/comments/application/comment.service';
import { CommentSchema } from './features/comments/domain/comment.entity';
import { Blog, BlogSchema } from './features/blogs/domain/blog.entity';
import { BlogService } from './features/blogs/application/blog.service';
import { BlogQueryRepository } from './features/blogs/repository/blog.query-repository';
import { BlogRepository } from './features/blogs/repository/blog.repository';
import { Post, PostSchema } from './features/posts/domain/post.entity';
import { PostService } from './features/posts/application/post.service';
import { PostRepository } from './features/posts/repository/post.repository';
import { PostQueryRepository } from './features/posts/repository/post.query-repository';
import { BlogController } from './features/blogs/api/blog.controller';
import { PostController } from './features/posts/api/post.controller';

@Module({
  imports: [
    MongooseModule.forRoot(SETTINGS.MONGO_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema }
    ]),
  ],
  controllers: [AppController, UserController, CommentController, BlogController, PostController],
  providers: [
    AppService,
    UserService, UserQueryRepository, UserRepository,
    BcryptService,
    CommentService, CommentQueryRepository, CommentRepository,
    BlogService, BlogRepository, BlogQueryRepository,
    PostService, PostRepository, PostQueryRepository],
})
export class AppModule {}
