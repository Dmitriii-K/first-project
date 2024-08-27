import { Injectable } from "@nestjs/common";
import { CommentRepository } from "src/features/comments/repository/comment.repository";
import { PostRepository } from "../repository/post.repository";
import { PostInputModel } from "../api/models/input.model";
import { UserDocument } from "src/features/users/domain/user.entity";
import { likeStatus } from "src/base/types/like.types";
import { Post, PostDocument } from "../domain/post.entity";
import { CommentInputModel } from "src/features/comments/api/models/input.model";
import { CommentDocument } from "src/features/comments/domain/comment.entity";


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
    // async createCommentByPost(paramId: string, data: CommentInputModel, user: UserDocument) {
    //     const post = await this.postRepository.findPostById(paramId);
    //     const createDate = new Date().toISOString();
    //     const newComment: CommentDocument = {
    //         postId: paramId,
    //         content: data.content,
    //         createdAt: createDate,
    //         commentatorInfo: {
    //             userId: user._id.toString(),
    //             userLogin: user.login,
    //         },
    //         likesInfo: {
    //             likesCount: 0,
    //             dislikesCount: 0
    //         }
    //     };
    //     return this.postRepository.insertComment(newComment);
    // }
    // async updatePostLike(user: UserDocument, data: likeStatus, post: PostDocument) {
    //     const existLike = await this.commentRepository.findLike(post._id.toString(), user._id.toString());
    //     if (!existLike) {
    //         const createDate = new Date().toISOString();
    //         const newLike: LikesType = {
    //             addedAt: createDate,
    //             commentId: post._id.toString(),
    //             userId: user._id.toString(),
    //             userIogin: user.login,
    //             status: data
    //         };
    //         if (data === likeStatus.Like) {
    //             post.extendedLikesInfo.likesCount++;
    //         } else if (data === likeStatus.Dislike) {
    //             post.extendedLikesInfo.dislikesCount++;
    //         }
    //         await this.commentRepository.insertLike(newLike);
    //         await this.postRepository.updatePostCount(post._id.toString(), post.extendedLikesInfo.likesCount, post.extendedLikesInfo.dislikesCount);
    //         return true;
    //     } else {
    //         if (existLike.status !== data) {
    //             // Обновление счетчиков лайков и дизлайков
    //             if (existLike.status === likeStatus.Like && data === likeStatus.Dislike) {
    //                 post.extendedLikesInfo.likesCount--;
    //                 post.extendedLikesInfo.dislikesCount++;
    //             } else if (existLike.status === likeStatus.Dislike && data === likeStatus.Like) {
    //                 post.extendedLikesInfo.dislikesCount--;
    //                 post.extendedLikesInfo.likesCount++;
    //             } else if (existLike.status === likeStatus.Like && data === likeStatus.None) {
    //                 post.extendedLikesInfo.likesCount--;
    //             } else if (existLike.status === likeStatus.Dislike && data === likeStatus.None) {
    //                 post.extendedLikesInfo.dislikesCount--;
    //             } else if (existLike.status === likeStatus.None && data === likeStatus.Like) {
    //                 post.extendedLikesInfo.likesCount++;
    //             } else if (existLike.status === likeStatus.None && data === likeStatus.Dislike) {
    //                 post.extendedLikesInfo.dislikesCount++;
    //             }
    //             existLike.status = data;
    //             await this.commentRepository.updateLikeStatus(post._id.toString(), existLike.status);
    //             await this.postRepository.updatePostCount(post._id.toString(), post.extendedLikesInfo.likesCount, post.extendedLikesInfo.dislikesCount);
    //             return true;
    //         }
    //     }
    //     return false;
    // }
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