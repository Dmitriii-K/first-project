import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { PostService } from "../application/post.service";
import { PostQueryRepository } from "../repository/post.query-repository";
import { TypePostHalper } from "src/base/types/post.types";
import { PostInputModel } from "./models/input.model";
import { PostRepository } from "../repository/post.repository";


@Controller('posts')
export class PostController {
    constructor(
        protected postService: PostService,
        protected postQueryRepository: PostQueryRepository,
        protected postRepository: PostRepository,
    ) {}

    @Get(':id/comments')
    async getCommentByPost(
        @Query() query: TypePostHalper,
        @Param('id') id: string) {
        // const userId: string | null = req.user ? req.user._id.toString() : null;
        const comments = await this.postQueryRepository.findCommentByPost(query, id/*, userId*/);
        if (comments.items.length < 1) {
            throw new NotFoundException('comment is not exists');
            }
            return comments;
    }
    @Get()
    async getPosts(@Query() query: TypePostHalper) {
        // const user = req.user ? req.user : null;
        const posts = await this.postQueryRepository.getAllPosts(query/*, user*/);
        return posts;
    }
    @Post()
    async createPost(@Body() body: PostInputModel) {
        // const userId: string | null = req.user ? req.user._id.toString() : null;
        const createResult = await this.postService.createPost(body, body.blogId); // запрос на проверку BlogId в middleware
        if (!createResult) {
            throw new NotFoundException('Post not create');
        }
        const newPost = await this.postQueryRepository.findPostById(createResult/*, userId*/);
        return newPost;
    }
    @Get(':id')
    async getPostById(@Param('id') id: string) {

        // const userId: string | null = req.user ? req.user._id.toString() : null;
        const postResult = await this.postQueryRepository.findPostById(id/*, userId*/);
        if (!postResult) {
            throw new NotFoundException('post is not found');
        }
        return postResult;
    }
    @Put(':id')
    @HttpCode(204)
    async updatePost(
        @Param('id') id: string,
        @Body() body: PostInputModel) {
            const findPost = await this.postService.findPostById(id);
            if (!findPost) {
                throw new NotFoundException('post is not found');
            }
            const updateResult = await this.postService.updatePost(body, id);
            return updateResult;
    }
    @Delete(':id')
    @HttpCode(204)
    async deletePost(@Param('id') id: string) {
        const deleteResult = await this.postRepository.deletePost(id);
        if (!deleteResult) {
            throw new NotFoundException('post is not found');
        }
    }
    // @Post(':id/comments')
    // async createCommentByPostId() {
    //         const createResult = await this.postService.createCommentByPost(req.params.id, req.body, req.user);
    //         if (!createResult) {
    //             res.sendStatus(404);
    //             return;
    //         }
    //         const newComment = await this.postQueryRepository.findCommentById(createResult);
    //         if (newComment)
    //             res.status(201).json(newComment);
    // }
    // @Put(':id/like-status')
    // async updateLikeStatus() {
    //         const user = req.user ? req.user : null;
    //         const post = await this.postService.findPostById(req.params.id);
    //         if (!post) {
    //             res.sendStatus(404);
    //             return;
    //         }
    //         const result = await this.postService.updatePostLike(user, req.body.likeStatus, post);
    //         if (result) {
    //             res.sendStatus(204);
    //             return;
    //         }
    //         res.sendStatus(204);
    //         return;
    // }
}