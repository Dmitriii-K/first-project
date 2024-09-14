import { Injectable } from "@nestjs/common";
import { likeStatus } from "src/features/likes/api/models/input.model";
import { Like } from "src/features/likes/domain/likes.entity";
import { MeViewModel } from "src/features/auth/api/models/output.model";
import { CommentRepository } from "../../repository/comment.repository";
import { CommentViewModel } from "../../api/models/output.model";

@Injectable()
export class LikeStatusUseCase {
    constructor(private commentRepository: CommentRepository) {}

    async execute(user: MeViewModel, data: likeStatus, comment: CommentViewModel) {
        const existLike = await this.commentRepository.findLike(comment.id, user.userId);
        if (!existLike) {
            const newLike: Like = Like.createLike(comment.id, user.userId, user.login, data);
            if (data === likeStatus.Like) {
                comment.likesInfo.likesCount++;
            } else if (data === likeStatus.Dislike) {
                comment.likesInfo.dislikesCount++;
            }
            await this.commentRepository.insertLike(newLike);
            await this.commentRepository.updateLikesInfo(comment.id, comment.likesInfo.likesCount, comment.likesInfo.dislikesCount);
            return true;
        } else {
            if (existLike.status !== data) {
                // Обновление счетчиков лайков и дизлайков
                if (existLike.status === likeStatus.Like && data === likeStatus.Dislike) {
                    comment.likesInfo.likesCount--;
                    comment.likesInfo.dislikesCount++;
                } else if (existLike.status === likeStatus.Dislike && data === likeStatus.Like) {
                    comment.likesInfo.dislikesCount--;
                    comment.likesInfo.likesCount++;
                } else if (existLike.status === likeStatus.Like && data === likeStatus.None) {
                    comment.likesInfo.likesCount--;
                } else if (existLike.status === likeStatus.Dislike && data === likeStatus.None) {
                    comment.likesInfo.dislikesCount--;
                } else if (existLike.status === likeStatus.None && data === likeStatus.Like) {
                    comment.likesInfo.likesCount++;
                } else if (existLike.status === likeStatus.None && data === likeStatus.Dislike) {
                    comment.likesInfo.dislikesCount++;
                }
                existLike.status = data;
                await this.commentRepository.updateLikeStatus(comment.id, existLike.status);
                await this.commentRepository.updateLikesInfo(comment.id, comment.likesInfo.likesCount, comment.likesInfo.dislikesCount);
                return true;
            }
        }
        return false;
    }
}