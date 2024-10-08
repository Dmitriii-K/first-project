import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { BlogController } from "./blogs/api/blog.controller";
import { BlogService } from "./blogs/application/blog.service";
import { BlogRepository } from "./blogs/repository/blog.repository";
import { BlogQueryRepository } from "./blogs/repository/blog.query-repository";
import { CommentController } from "./comments/api/comment.controller";
import { CommentService } from "./comments/application/comment.service";
import { CommentRepository } from "./comments/repository/comment.repository";
import { CommentQueryRepository } from "./comments/repository/comment.query-repository";
import { PostController } from "./posts/api/post.controller";
import { PostService } from "./posts/application/post.service";
import { PostRepository } from "./posts/repository/post.repository";
import { PostQueryRepository } from "./posts/repository/post.query-repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Like, LikesSchema } from "./likes/domain/likes.entity";
import { Post, PostSchema } from "./posts/domain/post.entity";
import { Blog, BlogSchema } from "./blogs/domain/blog.entity";
import { Comment, CommentSchema } from "./comments/domain/comment.entity";
import { CoreModule } from "src/infrastructure/core.module";
import { UsersModule } from "../users/users.module";
import { LikeStatusUseCase } from "./comments/application/use-cases/like-status";
import { UpdatePostLikeUseCase } from "./posts/application/use-cases/update-post-like";
import { CreateCommentByPostUseCase } from "./posts/application/use-cases/create-comment-by-post";
import { CreatePostUseCase } from "./posts/application/use-cases/create-post";
import { CreatePostForBlogUseCase } from "./blogs/application/use-cases/create-post-for-blog";

@Module({
    imports: [
        CqrsModule,
        UsersModule,
        CoreModule,
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
            { name: Blog.name, schema: BlogSchema },
            { name: Post.name, schema: PostSchema },
            { name: Like.name, schema: LikesSchema },
        ]),
    ],
    controllers: [BlogController, CommentController, PostController],
    providers: [
        BlogService, BlogRepository, BlogQueryRepository, 
        CommentService, CommentRepository, CommentQueryRepository, 
        PostService, PostRepository, PostQueryRepository,
        LikeStatusUseCase, UpdatePostLikeUseCase, CreateCommentByPostUseCase, 
        CreatePostUseCase, CreatePostForBlogUseCase
    ],
    exports: [BlogRepository, PostRepository, CommentRepository, BlogRepository]
})
export class BloggersPlatformModule {
}