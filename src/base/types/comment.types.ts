import { LikesCount } from "./like.types";

export class CommentatorInfo {
    userId:	string;
    userLogin:	string;
}

export class CommentDBType {
    postId?: string;
    content:	string;
    createdAt:	string;
    commentatorInfo: CommentatorInfo;
    likesInfo: LikesCount
}