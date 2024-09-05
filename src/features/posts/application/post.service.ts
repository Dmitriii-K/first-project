import { Injectable } from "@nestjs/common";
import { CommentRepository } from "src/features/comments/repository/comment.repository";
import { PostRepository } from "../repository/post.repository";
import { PostInputModel } from "../api/models/input.model";
import { UserDocument } from "src/features/users/domain/user.entity";
import { Post, PostDocument } from "../domain/post.entity";
import { CommentInputModel } from "src/features/comments/api/models/input.model";
import { Comment, CommentDocument } from "src/features/comments/domain/comment.entity";
import { MeViewModel } from "src/features/auth/api/models/output.model";
import { likeStatus } from "src/features/likes/api/models/input.model";
import { Like } from "src/features/likes/domain/likes.entity";


@Injectable()
export class PostService {
    constructor(
        protected postRepository: PostRepository,
        protected commentRepository: CommentRepository
    ) {}

    async createPost(data: PostInputModel, id: string) {
        const findBlogNameForId = await this.postRepository.findBlogNameForId(id);
        if (!findBlogNameForId) {
            throw new Error('Blog not found');// Норм?
        }
        
        const newPost: Post = Post.createPost(data.title, data.shortDescription, data.content, data.blogId, findBlogNameForId.name);
        return this.postRepository.insertPost(newPost);
    }
    async createCommentByPost(paramId: string, data: CommentInputModel, user: MeViewModel) {
        const post = await this.postRepository.findPostById(paramId);
        const newComment: Comment = Comment.createComment(paramId, data.content, user.userId, user.login)
        return this.postRepository.insertComment(newComment);
    }
    async updatePostLike(user: MeViewModel, data: likeStatus, post: PostDocument) {
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
    async updatePost(data: PostInputModel, id: string) {
        const succsesUpdate = await this.postRepository.updatePost(data, id);
        if (succsesUpdate) {
            return succsesUpdate;
        } else {
            return false;
        }
    }
    async getPostById(postId: string) {
        return this.postRepository.findPostById(postId);
    }
    async findPostById(postId: string) {
        return this.postRepository.findPostById(postId);
    }
}