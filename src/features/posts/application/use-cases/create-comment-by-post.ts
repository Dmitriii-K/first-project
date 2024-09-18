import { PostRepository } from "../../repository/post.repository";
import { MeViewModel } from "src/features/auth/api/models/output.model";
import { CommandHandler } from "@nestjs/cqrs";
import { CommentInputModel } from "src/features/comments/api/models/input.model";
import { NotFoundException } from "@nestjs/common";
import { Comment } from "src/features/comments/domain/comment.entity";

export class CreateCommentByPostCommand {
    constructor(
        public paramId: string,
        public body: CommentInputModel,
        public user: MeViewModel
        ) {}
}

@CommandHandler(CreateCommentByPostCommand)
export class CreateCommentByPostUseCase {
    constructor(private postRepository: PostRepository) {}

    async execute(command: CreateCommentByPostCommand) {
        const {paramId, body, user} = command;
        const post = await this.postRepository.findPostById(paramId);
        if(!post) {
            throw new NotFoundException()
        }
        const newComment: Comment = Comment.createComment(paramId, body.content, user.userId, user.login)
        return this.postRepository.insertComment(newComment);
    }
}