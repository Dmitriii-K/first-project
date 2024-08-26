import { CommentatorInfo } from "src/base/types/comment.types";
import { likeStatus } from "src/base/types/like.types";

export type CommentViewModel = {
    id:string;
    content:	string;
    createdAt:	string;
    commentatorInfo: CommentatorInfo;
    likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: likeStatus
    }
}

export type PaginatorCommentViewModelDB = {
    pagesCount:	number;
    page:	number;
    pageSize:	number;
    totalCount:	number;
    items: CommentViewModel[];
}