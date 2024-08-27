import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ICommentRepository } from "../api/models/interface";
import { Comment, CommentModelType } from "../domain/comment.entity";

@Injectable()
export class CommentRepository /*implements ICommentRepository*/{
    constructor(@InjectModel(Comment.name) private commentModel: CommentModelType) {}

    // async updateComment(id: string, content: string) {
    //     const mongoId = new ObjectId(id);
    //     const updateComment = await CommentModel.updateOne({ _id: mongoId }, { $set: { content } });
    //     return updateComment.modifiedCount === 1;
    // }
    // async findAllLikesForPost(postId: string): Promise<LikesType[]> {
    //     const mongoPostId = new ObjectId(postId);
    //     return LikesModel.find({ commentId: mongoPostId }).exec();
    // }
    // async findLike(commentId: string, userId: string) {
    //     const mongoCommentId = new ObjectId(commentId);
    //     const mongoUserId = new ObjectId(userId);
    //     const like = await LikesModel.findOne({ commentId: mongoCommentId, userId: mongoUserId });
    //     return like || null;
    // }
    // async insertLike(data: LikesType) {
    //     const result = LikesModel.create(data);
    //     return (await result)._id.toString();
    // }
    // async updateLikeStatus(id: string, updateStatus: string) {
    //     const mongoId = new ObjectId(id);
    //     const result = await LikesModel.updateOne({ commentId: mongoId }, { $set: { status: updateStatus } });
    //     return result.modifiedCount === 1;
    // }
    // async updateLikesInfo(commentId: string, likesCount: number, dislikesCount: number) {
    //     const mongoCommentId = new ObjectId(commentId);
    //     await CommentModel.updateOne(
    //         { _id: mongoCommentId },
    //         { $set: { 'likesInfo.likesCount': likesCount, 'likesInfo.dislikesCount': dislikesCount } }
    //     );
    // }
    // async findUserByComment(id: string) {
    //     const mongoId = new ObjectId(id);
    //     return CommentModel.findOne({ _id: mongoId });
    // }
    // async deleteComment(id: string) {
    //     const mongoId = new ObjectId(id);
    //     const comment = await CommentModel.deleteOne({ _id: mongoId });
    //     return comment.deletedCount === 1;
    // }
}