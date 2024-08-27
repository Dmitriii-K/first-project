import { Injectable } from "@nestjs/common";
import { BlogRepository } from "../repository/blog.repository";
import { BlogInputModel, BlogPostInputModel } from "../api/models/input.model";
import { Blog, BlogDocument } from "../domain/blog.entity";
import { Post, PostDocument } from "src/features/posts/domain/post.entity";


@Injectable()
export class BlogService {
    constructor(protected blogRepository: BlogRepository) {}

    async createBlog(data: BlogInputModel) {
        // const createDate = new Date().toISOString();
        // const newBlog: BlogDocument = {
        //     name: data.name,
        //     description: data.description,
        //     websiteUrl: data.websiteUrl,
        //     createdAt: createDate,
        //     isMembership: false,
        // };
        const newBlog: Blog = Blog.createBlog(data.name, data.description, data.websiteUrl);
        return this.blogRepository.insertBlog(newBlog);
    }
    async createPostForBlog(blogId: string, data: BlogPostInputModel, name: string) {
        // const createDate = new Date().toISOString();
        // const newPost: PostDocument = {
        //     title: data.title,
        //     shortDescription: data.shortDescription,
        //     content: data.content,
        //     blogId: blogId,
        //     blogName: name,
        //     createdAt: createDate,
        //     extendedLikesInfo: {
        //         likesCount: 0,
        //         dislikesCount: 0,
        //         newestLikes: []
        //     }
        // };
        const newPost: Post = Post.createPost(data.title, data.shortDescription, data.content, blogId, name);
        return this.blogRepository.insertPostForBlog(newPost);
    }
    async findBlogById(id: string) {
        const blog = await this.blogRepository.findBlogById(id);
        if (!blog) {
            return null;
        } else {
            return blog;
        }
    }
    async updateBlog(id: string, updateContent: BlogInputModel) {
        const updateResult = await this.blogRepository.updateBlog(id, updateContent);
        if (updateResult) {
            return updateResult;
        } else {
            return false;
        }
    }
    async deleteBlog(id: string) {
        const deleteResult = await this.blogRepository.deleteBlog(id);
        if (deleteResult) {
            return true;
        } else {
            return false;
        }
    }
}