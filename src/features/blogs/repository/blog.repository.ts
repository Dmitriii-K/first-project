import { Injectable } from "@nestjs/common";
import { BlogInputModel } from "../api/models/input.model";
import { InjectModel } from "@nestjs/mongoose";
import { Blog, BlogDocument, BlogModelType } from "../domain/blog.entity";
import { Post, PostDocument, PostModelType } from "src/features/posts/domain/post.entity";


@Injectable()
export class BlogRepository {
    constructor(
        @InjectModel(Blog.name) private blogModel: BlogModelType,
        @InjectModel(Post.name) private postModel: PostModelType) {}

    async insertBlog(data: BlogDocument) {
        const result = this.blogModel.create(data);
        return (await result)._id.toString();
    }
    async insertPostForBlog(data: PostDocument) {
        const result = this.postModel.create(data);
        return (await result)._id.toString();
    }
    async findBlogById(blogId: string) {
        return this.blogModel.findOne({ _id: blogId });
    }
    async updateBlog(blogId: string, updateContent: BlogInputModel) {
        const updateResult = await this.blogModel.updateOne({ _id: blogId }, { $set: updateContent });
        return updateResult.modifiedCount === 1;
    }
    async deleteBlog(blogId: string) {
        const result = await this.blogModel.deleteOne({ _id: blogId });
        return result.deletedCount === 1;
    }
}