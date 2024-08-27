import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostModelType } from "../posts/domain/post.entity";
import { Blog, BlogModelType } from "../blogs/domain/blog.entity";
import { Comment, CommentModelType } from "../comments/domain/comment.entity";
import { User, UserModelType } from "../users/domain/user.entity";

@Injectable()
export class TestingService {
    constructor(
    @InjectModel(User.name) private userModel: UserModelType,
    @InjectModel(Comment.name) private commentModel: CommentModelType,
    @InjectModel(Blog.name) private blogModel: BlogModelType,
    @InjectModel(Post.name) private postModel: PostModelType) {}

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