import { Module } from "@nestjs/common";
import { TestingController } from "./api/testing.controller";
import { TestingService } from "./application/testing.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "../bloggers_platform/comments/domain/comment.entity";
import { User, UserSchema } from "../users/domain/user.entity";
import { Blog, BlogSchema } from "../bloggers_platform/blogs/domain/blog.entity";
import { Post, PostSchema } from "../bloggers_platform/posts/domain/post.entity";
import { Session, SessionSchema } from "../sessions/domain/session.entity";
import { ApiInfo, ApiSchema } from "../auth/domain/auth.entity";
import { Like, LikesSchema } from "../bloggers_platform/likes/domain/likes.entity";


@Module({
    imports:  [ MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: Comment.name, schema: CommentSchema },
        { name: Blog.name, schema: BlogSchema },
        { name: Post.name, schema: PostSchema },
        { name: Session.name, schema: SessionSchema },
        { name: ApiInfo.name, schema: ApiSchema },
        { name: Like.name, schema: LikesSchema },
    ])],
    controllers: [TestingController],
    providers: [TestingService],
    exports: []
})
export class TestingsModule {
}