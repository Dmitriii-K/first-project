export enum likeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

export class LikesType {
    addedAt: string;
    commentId: string;
    userId: string;
    userIogin: string;
    status: likeStatus
}

export class LikesCount {
    likesCount: number;
    dislikesCount: number;
}

export class NewestLikesType {
    addedAt: string;
    userId: string;
    login: string
}