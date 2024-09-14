import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CommentRepository } from "src/features/comments/repository/comment.repository";
import { PostRepository } from "../../repository/post.repository";
import { Post, PostDocument } from "../../domain/post.entity";
import { MeViewModel } from "src/features/auth/api/models/output.model";
import { likeStatus } from "src/features/likes/api/models/input.model";
import { Like } from "src/features/likes/domain/likes.entity";
import {WithId} from "mongodb"

@Injectable()
export class UpdatePostLikeUseCase {
    constructor(
        private postRepository: PostRepository,
        private commentRepository: CommentRepository
    ) {}

    async execute(user: MeViewModel, data: likeStatus, post: WithId<Post>) {
        const existLike = await this.commentRepository.findLike(post._id.toString(), user.userId);
        if (!existLike) {
            const newLike: Like = Like.createLike(post._id.toString(), user.userId, user.login, data);
            if (data === likeStatus.Like) {
                post.extendedLikesInfo.likesCount++;
            } else if (data === likeStatus.Dislike) {
                post.extendedLikesInfo.dislikesCount++;
            }
            await this.commentRepository.insertLike(newLike);
            await this.postRepository.updatePostCount(post._id.toString(), post.extendedLikesInfo.likesCount, post.extendedLikesInfo.dislikesCount);
            return true;
        } else {
            if (existLike.status !== data) {
                // Обновление счетчиков лайков и дизлайков
                if (existLike.status === likeStatus.Like && data === likeStatus.Dislike) {
                    post.extendedLikesInfo.likesCount--;
                    post.extendedLikesInfo.dislikesCount++;
                } else if (existLike.status === likeStatus.Dislike && data === likeStatus.Like) {
                    post.extendedLikesInfo.dislikesCount--;
                    post.extendedLikesInfo.likesCount++;
                } else if (existLike.status === likeStatus.Like && data === likeStatus.None) {
                    post.extendedLikesInfo.likesCount--;
                } else if (existLike.status === likeStatus.Dislike && data === likeStatus.None) {
                    post.extendedLikesInfo.dislikesCount--;
                } else if (existLike.status === likeStatus.None && data === likeStatus.Like) {
                    post.extendedLikesInfo.likesCount++;
                } else if (existLike.status === likeStatus.None && data === likeStatus.Dislike) {
                    post.extendedLikesInfo.dislikesCount++;
                }
                existLike.status = data;
                await this.commentRepository.updateLikeStatus(post._id.toString(), existLike.status);
                await this.postRepository.updatePostCount(post._id.toString(), post.extendedLikesInfo.likesCount, post.extendedLikesInfo.dislikesCount);
                return true;
            }
        }
        return false;
    }
}