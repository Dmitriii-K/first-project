import { Module } from "@nestjs/common";
import { CommentController } from "./api/comment.controller";
import { CommentService } from "./application/comment.service";
import { CommentQueryRepository } from "./repository/comment.query-repository";
import { CommentRepository } from "./repository/comment.repository";


@Module({
    imports: [],
    controllers: [CommentController],
    providers: [CommentService, CommentRepository, CommentQueryRepository],
    exports: []
})
export class CommentsModule {
}