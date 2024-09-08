import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { BlogService } from "../application/blog.service";
import { BlogQueryRepository } from "../repository/blog.query-repository";
import { TypeBlogHalper, TypePostForBlogHalper } from "src/base/types/blog.types";
import { PaginatorBlogViewModel } from "./models/output.model";
import { BlogInputModel, BlogPostInputModel } from "./models/input.model";
import { BlogRepository } from "../repository/blog.repository";
import { BlogExistsPipe } from "src/infrastructure/pipes/blogExists.pipe";
import { Request, Response } from "express";
import { BasicAuthGuard } from "src/infrastructure/guards/basic.guard";


@Controller('blogs')
export class BlogController {
    constructor(
        protected blogService: BlogService,
        protected blogQueryRepository: BlogQueryRepository,
        protected blogRepository: BlogRepository
    ) {}

    @Get()
    async getAllBlogs(@Query() query: TypeBlogHalper) {
        const blogs: PaginatorBlogViewModel = await this.blogQueryRepository.getAllBlogs(query);
        return blogs;
    }

    @Post()
    @UseGuards(BasicAuthGuard)
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
        @Param('id', BlogExistsPipe) id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
            const userId: string | null = req.user ? req.user.userId : null;
            
            return await this.blogQueryRepository.getPostFofBlog(query, id, userId);
    }

    @Post(':id/posts')
    @UseGuards(BasicAuthGuard)
    async createPostForBlog(
        @Param('id') id: string,
        @Body() body: BlogPostInputModel) {
            const findBlog = await this.blogService.findBlogById(id);
            if (!findBlog) {
                throw new NotFoundException();
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
    @UseGuards(BasicAuthGuard)
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
    @UseGuards(BasicAuthGuard)
    @HttpCode(204)
    async deleteBlog(@Param('id') id: string) {
        const deleteResult = await this.blogService.deleteBlog(id);
        if (!deleteResult) {
        throw new NotFoundException('blog is not found');
        }
    }
}