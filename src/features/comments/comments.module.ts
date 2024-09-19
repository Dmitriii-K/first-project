import { Module } from "@nestjs/common";
import { CommentController } from "./api/comment.controller";
import { CommentService } from "./application/comment.service";
import { CommentQueryRepository } from "./repository/comment.query-repository";
import { CommentRepository } from "./repository/comment.repository";
import { CommandBus } from "@nestjs/cqrs";


@Module({
    imports: [],
    controllers: [CommentController],
    providers: [CommentService, CommentRepository, CommentQueryRepository, CommandBus],
    exports: []
})
export class CommentsModule {
}