export enum likeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

export type LikesType = {
    addedAt: string;
    commentId: string;
    userId: string;
    userIogin: string;
    status: likeStatus
}

export type LikesCount = {
    likesCount: number,
    dislikesCount: number,
}