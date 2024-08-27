import { likeStatus, NewestLikesType } from "src/base/types/like.types";

export class PostViewModel {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    extendedLikesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: likeStatus,
        newestLikes: NewestLikesType[]
    }
}

export class PaginatorPostViewModel {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: PostViewModel[];
}