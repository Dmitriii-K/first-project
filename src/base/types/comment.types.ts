import { LikesCount } from "./like.types";

export type CommentatorInfo = {
    userId:	string;
    userLogin:	string;
}

export type CommentDBType = {
    postId?: string;
    content:	string;
    createdAt:	string;
    commentatorInfo: CommentatorInfo;
    likesInfo: LikesCount
}