import { Injectable } from "@nestjs/common";
import { likeStatus, LikeStatusDto } from "src/features/likes/api/models/input.model";
import { Like } from "src/features/likes/domain/likes.entity";
import { MeViewModel } from "src/features/auth/api/models/output.model";
import { CommentRepository } from "../../repository/comment.repository";
import { CommentViewModel } from "../../api/models/output.model";
import { CommandHandler } from "@nestjs/cqrs";

// export class LikeStatusCommand {
//     constructor(public body: LikeStatusDto) {}
// }

// @CommandHandler(LikeStatusCommand)

@Injectable()
export class LikeStatusUseCase {
    constructor(private commentRepository: CommentRepository) {}

    async execute(user: MeViewModel, body: likeStatus, comment: CommentViewModel) {
        const existLike = await this.commentRepository.findLike(comment.id, user.userId);
        if (!existLike) {
            const newLike: Like = Like.createLike(comment.id, user.userId, user.login, body);
            if (body === likeStatus.Like) {
                comment.likesInfo.likesCount++;
            } else if (body === likeStatus.Dislike) {
                comment.likesInfo.dislikesCount++;
            }
            await this.commentRepository.insertLike(newLike);
            await this.commentRepository.updateLikesInfo(comment.id, comment.likesInfo.likesCount, comment.likesInfo.dislikesCount);
            return true;
        } else {
            if (existLike.status !== body) {
                // Обновление счетчиков лайков и дизлайков
                if (existLike.status === likeStatus.Like && body === likeStatus.Dislike) {
                    comment.likesInfo.likesCount--;
                    comment.likesInfo.dislikesCount++;
                } else if (existLike.status === likeStatus.Dislike && body === likeStatus.Like) {
                    comment.likesInfo.dislikesCount--;
                    comment.likesInfo.likesCount++;
                } else if (existLike.status === likeStatus.Like && body === likeStatus.None) {
                    comment.likesInfo.likesCount--;
                } else if (existLike.status === likeStatus.Dislike && body === likeStatus.None) {
                    comment.likesInfo.dislikesCount--;
                } else if (existLike.status === likeStatus.None && body === likeStatus.Like) {
                    comment.likesInfo.likesCount++;
                } else if (existLike.status === likeStatus.None && body === likeStatus.Dislike) {
                    comment.likesInfo.dislikesCount++;
                }
                existLike.status = body;
                await this.commentRepository.updateLikeStatus(comment.id, existLike.status);
                await this.commentRepository.updateLikesInfo(comment.id, comment.likesInfo.likesCount, comment.likesInfo.dislikesCount);
                return true;
            }
        }
        return false;
    }
}