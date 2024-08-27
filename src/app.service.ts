import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModelType } from './features/users/domain/user.entity';
import { Comment, CommentModelType } from './features/comments/domain/comment.entity';
import { Blog, BlogModelType } from './features/blogs/domain/blog.entity';
import { Post, PostModelType } from './features/posts/domain/post.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: UserModelType,
    @InjectModel(Comment.name) private commentModel: CommentModelType,
    @InjectModel(Blog.name) private blogModel: BlogModelType,
    @InjectModel(Post.name) private postModel: PostModelType) {}
  
  getHello(): string {
    return 'Hi World!';
  }

  async deleteAllData(): Promise<void> {
    await this.userModel.deleteMany({});
    await this.blogModel.deleteMany({});
    await this.postModel.deleteMany({});
    await this.commentModel.deleteMany({});
    // await this.apiModel.deleteMany({});
    // await this.sessionModel.deleteMany({});
    // await this.likesModel.deleteMany({});
    console.log('All data is deleted');
  }
}
