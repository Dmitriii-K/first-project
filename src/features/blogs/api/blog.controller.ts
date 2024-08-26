import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { BlogService } from "../application/blog.service";
import { BlogQueryRepository } from "../repository/blog.query-repository";
import { TypeBlogHalper, TypePostForBlogHalper } from "src/base/types/blog.types";
import { PaginatorBlogViewModel } from "./models/output.model";
import { BlogInputModel, BlogPostInputModel } from "./models/input.model";


@Controller('blogs')
export class BlogController {
    constructor(
        protected blogService: BlogService,
        protected blogQueryRepository: BlogQueryRepository) {}

    @Get()
    async getAllBlogs(@Query() query: TypeBlogHalper) {
        const blogs: PaginatorBlogViewModel = await this.blogQueryRepository.getAllBlogs(query);
        return blogs;
    }
    @Post()
    async createBlog(@Body() body: BlogInputModel) {
        const createResult = await this.blogService.createBlog(body);
        if (!createResult) {
            throw new NotFoundException('Blog not create');
        }
        const newBlog = await this.blogQueryRepository.getBlogById(createResult);
        return newBlog;
    }
    @Get(':id/posts')
    async getPostForBlog(
        @Query() query: TypePostForBlogHalper,
        @Param('id') id: string) {
            // const userId: string | null = req.user ? req.user._id.toString() : null;
            const posts = await this.blogQueryRepository.getPostFofBlog(query, id/*, userId*/);
            if (!posts.items) {
                throw new NotFoundException('blog is not exists');
            }
            return posts;
    }
    @Post(':id')
    async createPostForBlog(
        @Param('id') id: string,
        @Body() body: BlogPostInputModel) {
            const findBlog = await this.blogService.findBlogById(id);
            if (!findBlog) {
                throw new NotFoundException('blog is not exists');
            }
            const createResult = await this.blogService.createPostForBlog(id, body, findBlog.name);
            const newPostForBlog = await this.blogQueryRepository.getPostForBlogById(createResult);
            return newPostForBlog;
    }
    @Get(':id')
    async getBlogById(@Param('id') id: string) {
        const blogResult = await this.blogQueryRepository.getBlogById(id);
        if (!blogResult) {
            throw new NotFoundException('blog is not found');
        }
        return blogResult;
    }
    @Put(':id')
    @HttpCode(204)
    async updateBlog(
        @Param('id') id: string,
        @Body() body: BlogInputModel) {
            const findBlog = await this.blogService.findBlogById(id);
            if (!findBlog) {
                throw new NotFoundException('blog is not found');
            }
            const updateBlogResult = await this.blogService.updateBlog(id, body);
            return updateBlogResult;
    }
    @Delete(':id')
    @HttpCode(204)
    async deleteBlog(@Param('id') id: string) {
        const deleteResult = await this.blogService.deleteBlog(id);
        if (!deleteResult) {
        throw new NotFoundException('blog is not found');
        }
    }
}