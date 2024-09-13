import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, Req, Res, UseGuards } from "@nestjs/common";
import { PostService } from "../application/post.service";
import { PostQueryRepository } from "../repository/post.query-repository";
import { TypePostHalper } from "src/base/types/post.types";
import { PostInputModel } from "./models/input.model";
import { PostRepository } from "../repository/post.repository";
import { likeStatus, LikeStatusDto } from "src/features/likes/api/models/input.model";
import { Request, RequestHandler, Response } from "express";
import { MeViewModel } from "src/features/auth/api/models/output.model";
import { CommentInputModel } from "src/features/comments/api/models/input.model";
import { BasicAuthGuard } from "src/infrastructure/guards/basic.guard";
import { JwtAuthGuard } from "src/infrastructure/guards/jwt-auth.guard";
import { SoftAuthGuard } from "src/infrastructure/guards/dubl-guards/soft-auth.guard";


@Controller('posts')
export class PostController {
    constructor(
        protected postService: PostService,
        protected postQueryRepository: PostQueryRepository,
        protected postRepository: PostRepository,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Put(':id/like-status')
    @HttpCode(204)
    async updateLikeStatus(
        @Param('id') id: string,
        @Body() body: LikeStatusDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        const user = req.user ? req.user : null;
        const post = await this.postService.findPostById(id);
        if (!post || !user) {
            throw new NotFoundException();
            }
        const result = await this.postService.updatePostLike(user, body.likeStatus, post);
        return result;
    }

    @UseGuards(SoftAuthGuard)
    @Get(':id/comments')
    async getCommentByPost(
        @Query() query: TypePostHalper,
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
        const userId: string | null = req.user ? req.user.userId : null;
        const comments = await this.postQueryRepository.findCommentByPost(query, id, userId);
        if (comments.items.length < 1) {
            throw new NotFoundException();
            }
            return comments;
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/comments')
    async createCommentByPostId(
        @Body() body: CommentInputModel,
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        const user = req.user ? req.user : null;
        const createResult = await this.postService.createCommentByPost(id, body, user!);
        if (!createResult) {
            throw new NotFoundException();
        }
        const newComment = await this.postQueryRepository.findCommentById(createResult);
        return newComment;
    }

    @UseGuards(SoftAuthGuard)
    @Get()
    async getPosts(
        @Query() query: TypePostHalper,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
        const user = req.user ? req.user : null;
        const posts = await this.postQueryRepository.getAllPosts(query, user);
        return posts;
    }

    @UseGuards(BasicAuthGuard, SoftAuthGuard)
    @Post()
    async createPost(
        @Body() body: PostInputModel,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
        const userId: string | null = req.user ? req.user.userId : null;
        const createResult = await this.postService.createPost(body, body.blogId);
        if (!createResult) {
            throw new NotFoundException();
        }
        const newPost = await this.postQueryRepository.findPostById(createResult, userId);
        return newPost;
    }

    @UseGuards(SoftAuthGuard)
    @Get(':id')
    async getPostById(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request) {
        const userId: string | null = req.user ? req.user.userId : null;
        const postResult = await this.postQueryRepository.findPostById(id, userId);
        if (!postResult) {
            throw new NotFoundException();
        }
        return postResult;
    }

    @UseGuards(BasicAuthGuard)
    @Put(':id')
    @HttpCode(204)
    async updatePost(
        @Param('id') id: string,
        @Body() body: PostInputModel) {
            const findPost = await this.postService.findPostById(id);
            if (!findPost) {
                throw new NotFoundException();
            }
            const updateResult = await this.postService.updatePost(body, id);
            if (!updateResult) {
                throw new NotFoundException();
            }
            return updateResult;
    }

    @UseGuards(BasicAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async deletePost(@Param('id') id: string) {
        const deleteResult = await this.postRepository.deletePost(id);
        if (!deleteResult) {
            throw new NotFoundException();
        }
    }
}