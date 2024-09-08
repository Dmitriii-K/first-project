export enum likeStatus {
    None = 'None',
    Like = 'Like',
    Dislike = 'Dislike'
}

export class LikesType {
    addedAt: string;
    commentId: string;
    userId: string;
    userLogin: string;
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

// export const likeStatusValidation = [
//     body("likeStatus")
//     .isString()
//     .trim()
//     .isIn(enumValues)
//     .withMessage("Invalid value")
// ];