import { Injectable } from "@nestjs/common";
import { ICommentQueryRepository, ICommentRepository } from "../api/models/interface";
import { InjectModel } from "@nestjs/mongoose";
import { CommentDBType } from "src/base/types/comment.types";
import { likeStatus } from "src/base/types/like.types";
import { CommentViewModel } from "../api/models/output.model";
import { CommentModelType } from "../domain/comment.entity";

@Injectable()
export class CommentQueryRepository implements ICommentQueryRepository{
    constructor(
        /*protected commentRepository: ICommentRepository,*/
        @InjectModel(Comment.name) private commentModel: CommentModelType
    ) {}

    async findCommentById(commentId: string/*, userId: string | null*/) {
        const comment = await this.commentModel.findOne({ _id: commentId });
        if (!comment) {
            return null;
        }
        // let like;
        // if (userId) {
        //     like = await this.commentRepository.findLike(commentId, userId);
        // }
        // const userLikeStatus = like ? like.status : likeStatus.None;
        return this.mapComment(comment/*, userLikeStatus*/);
    }
    mapComment(comment: WithId<CommentDBType>/*, userLikeStatus?: likeStatus*/): CommentViewModel {
        return {
            id: comment._id.toString(),
            content: comment.content,
            createdAt: comment.createdAt,
            commentatorInfo: comment.commentatorInfo,
            likesInfo: {
                likesCount: comment.likesInfo.likesCount,
                dislikesCount: comment.likesInfo.dislikesCount,
                myStatus: /*userLikeStatus || */likeStatus.None
            }
        };
    }
}