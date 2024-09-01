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
import { Comment, CommentSchema } from './features/comments/domain/comment.entity';
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
import { TestingController } from './features/testing/testing.controller';
import { TestingService } from './features/testing/testing.service';
import { LoginIsExistConstraint } from './infrastructure/decorators/validate/login-is-exist.decorator';
import { EmailIsExistConstraint } from './infrastructure/decorators/validate/email-is-exist.decorator';
import { AuthService } from './features/auth/application/auth.service';
import { AuthController } from './features/auth/api/auth.controller';
import { SessionController } from './features/sessions/api/session.controller';
import { AuthRepository } from './features/auth/repository/auth.repository';
import { AuthQueryRepository } from './features/auth/repository/auth.query-repository';
import { SessionService } from './features/sessions/application/session.service';
import { SessionRepository } from './features/sessions/repository/session.repository';
import { SessionQueryRepository } from './features/sessions/repository/session.query-repository';
import { Session, SessionSchema } from './features/sessions/domain/session.entity';
import { ApiInfo, ApiSchema } from './features/auth/domain/auth.entity';
import { EmailService } from './infrastructure/adapters/sendEmail';
import { JwtService } from './infrastructure/adapters/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './infrastructure/pasport-strategy/local.strategy';
import { JwtStrategy } from './infrastructure/pasport-strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(SETTINGS.MONGO_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: Session.name, schema: SessionSchema },
      { name: ApiInfo.name, schema: ApiSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: SETTINGS.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController,
    UserController,
    CommentController,
    BlogController,
    PostController,
    TestingController,
    AuthController,
    SessionController],
  providers: [
    // {
    //   provide: Types.IUserService,
    //   useClass: UserService
    // },
    AppService,
    TestingService,
    LocalStrategy, JwtStrategy,
    LoginIsExistConstraint, EmailIsExistConstraint,
    UserService, UserQueryRepository, UserRepository,
    BcryptService, EmailService, JwtService,
    CommentService, CommentQueryRepository, CommentRepository,
    BlogService, BlogRepository, BlogQueryRepository,
    PostService, PostRepository, PostQueryRepository,
    AuthService, AuthRepository, AuthQueryRepository,
    SessionService, SessionRepository, SessionQueryRepository],
})
export class AppModule {}
