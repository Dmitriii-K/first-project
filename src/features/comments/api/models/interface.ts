import { UserDBModel } from "src/base/types/user.types";
import { CommentViewModel } from "./output.model";
import { LikesType, likeStatus } from "src/base/types/like.types";
import { CommentDBType } from "src/base/types/comment.types";

export interface ICommentService {
    findUserByComment(commentId: string): Promise<CommentDBType | null>;
    updateComment(commentId: string, content: string): Promise<boolean>;
    likeStatus(user: WithId<UserDBModel>, data: likeStatus, comment: CommentViewModel): Promise<boolean>;
    deleteComment(commentId: string): Promise<boolean>;
}

export interface ICommentQueryRepository {
    findCommentById(commentId: string/*, userId: string | null*/): Promise<CommentViewModel | null>;
    mapComment(comment: WithId<CommentDBType>, userLikeStatus?: likeStatus): CommentViewModel;
}

export interface ICommentRepository {
    findUserByComment(id: string): Promise<WithId<CommentDBType> | null>;
    updateComment(id: string, content: string): Promise<boolean>;
    findAllLikesForPost(postId: string): Promise<LikesType[]>;
    findLike(commentId: string, userId: string): Promise<LikesType | null>;
    insertLike(like: LikesType): Promise<string>;
    updateLikesInfo(commentId: string, likesCount: number, dislikesCount: number): Promise<void>;
    updateLikeStatus(commentId: string, status: likeStatus): Promise<boolean>;
    deleteComment(id: string): Promise<boolean>;
}