import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "../application/blog.service";
import { BlogQueryRepository } from "../repository/blog.query-repository";


@Controller('blogs')
export class BlogController {
    constructor(
        protected blogService: BlogService,
        protected blogQueryRepository: BlogQueryRepository) {}

        // @Get()
        // async getAllBlogs() {
        //         const blogs = await this.blogQueryRepository.getAllBlogs(req.query);
        //         res.status(200).json(blogs);
        //         return;
        // }
        // @Post()
        // async createBlog() {
        //         const createResult = await this.blogService.createBlog(req.body);
        //         if (!createResult) {
        //             res.sendStatus(404);
        //             return;
        //         }
        //         const newBlog = await this.blogQueryRepository.getBlogById(createResult);
        //         if (newBlog) {
        //             res.status(201).json(newBlog);
        //         } else {
        //             res.sendStatus(500);
        //         }
        // }
        // @Get(':id')
        // async getPostForBlog() {
        //         const userId: string | null = req.user ? req.user._id.toString() : null;
        //         const posts = await this.blogQueryRepository.getPostFofBlog(req.query, req.params.id, userId);
        //         if (!posts.items) {
        //             res.sendStatus(404);
        //             return;
        //         } else {
        //             res.status(200).json(posts);
        //         }
        // }
        // @Post(':id')
        // async createPostForBlog(r) {
        //         const findBlog = await this.blogService.findBlogById(req.params.id);
        //         if (!findBlog) {
        //             res.sendStatus(404);
        //             return;
        //         }
        //         const createResult = await this.blogService.createPostForBlog(req.params.id, req.body, findBlog.name);
        //         const newPostForBlog = await this.blogQueryRepository.getPostForBlogById(createResult);
        //         if (newPostForBlog) {
        //             res.status(201).json(newPostForBlog);
        //         } else {
        //             res.sendStatus(500);
        //         }
        // }
        // @Get(':id')
        // async getBlogById() {
        //         const blogResult = await this.blogQueryRepository.getBlogById(req.params.id);
        //         if (blogResult) {
        //             res.status(200).json(blogResult);
        //         } else {
        //             res.sendStatus(404);
        //         }
        // }
        // @Put(':id')
        // async updateBlog() {
        //         const findBlog = await this.blogService.findBlogById(req.params.id);
        //         if (!findBlog) {
        //             res.sendStatus(404);
        //             return;
        //         }
        //         const updateBlogResult = await this.blogService.updateBlog(req.params.id, req.body);
        //         if (updateBlogResult) {
        //             res.sendStatus(204);
        //         }
        //         return;
        // }
        // @Delete(':id')
        // async deleteBlog() {
        //         const deleteResult = await this.blogService.deleteBlog(req.params.id);
        //         if (deleteResult) {
        //             res.sendStatus(204);
        //         } else {
        //             res.sendStatus(404);
        //         }
        // }
}