import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument, PostModelType } from "../domain/post.entity";
import { Comment, CommentDocument, CommentModelType } from "src/features/comments/domain/comment.entity";
import { PostInputModel } from "../api/models/input.model";
import { Blog, BlogModelType } from "src/features/blogs/domain/blog.entity";


@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name) private postModel: PostModelType,
        @InjectModel(Blog.name) private blogModel: BlogModelType,
        @InjectModel(Comment.name) private commentModel: CommentModelType,
    ) {}

    async findBlogNameForId(BlogId: string) {
        return this.blogModel.findOne({ _id: BlogId });
    }
    async findPostById(postId: string) {
        return this.postModel.findOne({ _id: postId });
    }
    async insertPost(data: Post) {
        const result = this.postModel.create(data);
        return (await result)._id.toString();
    }
    async insertComment(data: Comment) {
        const result = this.commentModel.create(data);
        return (await result).id;
    }
    async updatePost(post: PostInputModel, postId: string) {
        const result = this.postModel.updateOne({ _id: postId }, { $set: post });
        return (await result).modifiedCount === 1;
    }
    async updatePostCount(postId: string, likesCount: number, dislikesCount: number) {
        const result = this.postModel.updateOne(
            { _id: postId },
            { $set: { 'extendedLikesInfo.likesCount': likesCount, 'extendedLikesInfo.dislikesCount': dislikesCount } });
        return (await result).modifiedCount === 1;
    }
    async deletePost(postId: string) {
        const result = await this.postModel.deleteOne({ _id: postId });
        return result.deletedCount === 1;
    }
}