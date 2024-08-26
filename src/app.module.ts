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

@Module({
  imports: [
    MongooseModule.forRoot(SETTINGS.MONGO_URL),
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      { name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [AppController, UserController, CommentController],
  providers: [AppService, UserService, UserQueryRepository, UserRepository, BcryptService, CommentService, CommentQueryRepository, CommentRepository],
})
export class AppModule {}
