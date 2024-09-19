import { Module } from "@nestjs/common";
import { PostController } from "./api/post.controller";
import { PostService } from "./application/post.service";
import { PostQueryRepository } from "./repository/post.query-repository";
import { PostRepository } from "./repository/post.repository";
import { CommandBus } from "@nestjs/cqrs";


@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostService, PostRepository, PostQueryRepository, CommandBus],
    exports: []
})
export class PostsModule {
}
//CommentRepository находится в юзкейсе